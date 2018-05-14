'use strict';

module.exports = app => {
  app.post('/page/create', 'page.create');
  app.get('/page/test', 'page.test');
};
