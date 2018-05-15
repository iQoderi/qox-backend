'use strict';

module.exports = app => {
  app.get('/qox/:id/index.html', 'qoxCore.index');
};
