'use strict';

module.exports = {
  src: 'src/styles/**/*.styl',
  dest: 'css',
  stylus: {
    use: [require('nib')()],
    sourcemap: {inline: true}
  }
};
