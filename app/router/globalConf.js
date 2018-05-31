'use strict';

module.exports = app => {
  app.post('/global-conf/create', 'globalConf.create');
  app.put('/global-conf/update', 'globalConf.update');
  app.get('/global-conf/get', 'globalConf.get');
};
