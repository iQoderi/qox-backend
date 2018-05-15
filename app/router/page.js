'use strict';

module.exports = app => {
  app.post('/page/create', 'page.create');
  app.delete('/page/destroy', 'page.destroy');
};
