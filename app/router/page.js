'use strict';

module.exports = app => {
  app.post('/page/create', 'page.create');
  app.post('/page/register', 'page.register');
  app.delete('/page/destroy', 'page.destroy');
  app.get('/page/info', 'page.info');
  app.get('/page/modules', 'page.modules');
  app.get('/page/list', 'page.list');  
};
