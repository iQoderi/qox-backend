'use strict';

const userExist = require('../middleware/userExist');

module.exports = app => {
  app.post('/auth/register', userExist({ flag: 1 }), 'auth.register');
  app.post('/auth/login', userExist({ flag: 0 }), 'auth.login');
};
