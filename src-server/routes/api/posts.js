const Router = require('express-promise-router');
const _ = require('lodash');
const Posts = require('../../components/posts');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const posts = Posts(app);

  // Create
  router.post('/', auth.authenticate, async (req, res) => {
    const data = await posts.create(
      req.user,
      _.pick(req.body, 'content', 'title', 'published')
    );
    res.json(data);
  });

  // Get all
  router.get('/', auth.authenticate, async (req, res) => {
    let data;
    if (req.query.search) {
      data = await posts.search(req.query.search);
    } else {
      data = await posts.get();
    }
    res.json(data);
  });

  // Get post summary
  router.get('/post-summaries', auth.authenticate, async (req, res) => {
    const data = await posts.getSummary();
    res.json(data);
  });

  // Get one
  router.get('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.getOne(req.params.id);
    res.json(data);
  });

  // Update
  router.put('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.update(
      req.params.id,
      _.pick(req.body, 'content', 'title', 'published')
    );
    res.json(data);
  });

  // Delete
  router.delete('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.delete(req.params.id);
    res.json(data);
  });

  return Router().use('/posts', router);
};
