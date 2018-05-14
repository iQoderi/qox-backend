'use strict';

const Controller = require('egg').Controller;

class ComponentController extends Controller {
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;

    const isSuccess = await ctx.service.component.create(body);

    if (isSuccess) {
      ctx.body = {
          code: 0,
      };
    } else {
      ctx.body = {
        code: -1
      };
    }
  };

  async detail() {

  };
}

module.exports = ComponentController;
