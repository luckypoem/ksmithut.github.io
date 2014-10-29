'use strict';

require('../src/templates/handlebar-helpers');

module.exports = {
  src: 'content/**/*.md',
  dest: '',
  frontMatterCopy: function (file) {
    Object.keys(file.frontMatter).forEach(function (key) {
      file[key] = file.frontMatter[key];
    });
    delete file.frontMatter;
  },
  globMeta: [
    {
      glob: 'blog/**/*.md',
      meta: { template: 'post.hbs' }
    },
    {
      glob: 'projects/**/*.md',
      meta: { template: 'project.hbs' }
    }
  ],
  markdown: {
    smartypants: true,
    gfm: true,
    tables: true
  },
  permalinks: {
    pattern: ':path/'
  },
  collections: {
    posts: {
      pattern: 'blog/**/*.html',
      sortBy: 'date',
      reverse: true
    },
    projects: {
      pattern: 'projects/**/*.html',
      sortBy: 'title',
      reverse: false
    }
  },
  collectionsPaginate: {
    posts: {
      perPage: 10,
      template: 'posts.hbs',
      first: 'blog/index.html',
      path: 'blog/page/:num/index.html'
    },
    projects: {
      perPage: 10,
      template: 'projects.hbs',
      first: 'projects/index.html',
      path: 'projects/page/:num/index.html'
    }
  },
  collectionsTitles: {
    posts: 'Blog',
    projects: 'Projects'
  },
  templates: {
    engine: 'handlebars',
    directory: 'src/templates',
    partials: {
      footer: 'partials/footer',
      header: 'partials/header',
      pagination: 'partials/pagination'
    }
  }
};
