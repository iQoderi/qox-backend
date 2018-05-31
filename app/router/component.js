'use strict';

module.exports = app => {
  app.post('/component/create', 'component.create');
  app.put('/component/update', 'component.update');  
  app.get('/component/detail', 'component.detail');
  app.get('/component/list', 'component.list');
};
