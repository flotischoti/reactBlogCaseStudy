/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('posts', {
    published: { type: 'boolean' },
  });
};

exports.down = (pgm) => {};
