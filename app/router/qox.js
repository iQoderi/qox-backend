'use strict';

module.exports = app => {
  app.get('/qox/index.html', 'qoxCore.index');
};
