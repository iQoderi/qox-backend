'use strict';

module.exports = app => {
  app.get('/qox/:id/index.html', 'qox.index');
};
