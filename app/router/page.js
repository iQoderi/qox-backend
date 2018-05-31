'use strict';

module.exports = app => {
  app.post('/page/register', 'page.register');
  app.put('/page/build', 'page.build');  
  app.delete('/page/destroy', 'page.destroy');
  app.get('/page/info', 'page.info');
  app.get('/page/modules', 'page.modules');
  app.get('/page/components', 'page.components');  
  app.get('/page/list', 'page.list');  
};
