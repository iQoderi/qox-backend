'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  info() {
    const { ctx } = this;

    ctx.body = {
      code: 0,
      data: {
          user: ctx.state.user,
      }
    };
  }
};

module.exports = UserController;
