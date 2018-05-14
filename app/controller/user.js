'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  info() {
    this.ctx.body = 'get user info';
  }
};

module.exports = UserController;
