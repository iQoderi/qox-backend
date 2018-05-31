'use strict';

const Controller = require('egg').Controller;

class GlobalConfController extends Controller {
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;

    const result = await ctx.service.globalConf.create(body);

    ctx.body = {
      code: 0
    };
  }
  async update() {
    const { ctx } = this;
    const { body } = ctx.request;

    const result = await ctx.service.globalConf.update(body);

    ctx.body = {
      code: 0
    };
  }

  async get() {
    const { ctx } = this;

    const result = await ctx.service.globalConf.get();

    ctx.body = {
      code: 0,
      data: {
        ...result
      }
    };
  }
};

module.exports = GlobalConfController;
