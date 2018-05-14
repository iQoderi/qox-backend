'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async register() {
    const { ctx } = this;
    const { body } = ctx.request;

    body.password = await ctx.app.auth.encrypt(body.password);

    const isSuccess = await ctx.service.auth.register(body);

    if (isSuccess) {
      ctx.body = {
          code: 0,
      };
    } else {
      ctx.body = {
        code: 10009,
      };
    }
  }
  
  async login() {
    const { ctx } = this;
    const { password } = ctx.request.body;
    const { user } = ctx.state;
    const { password: hashPass } = user;
    const { validate } = ctx.app.auth;
    const isSame = await validate(password, hashPass);

    if (!isSame) {
        return ctx.body = {
          code: 10011,
        };
    }

    const token = ctx.app.auth.signToken(user.id);

    await ctx.service.auth.saveToken(user.id, token);

    ctx.body = {
        code: 0,
        data: {
            token,
            role: user.role,
        }
    }
  }
};

module.exports = AuthController;
