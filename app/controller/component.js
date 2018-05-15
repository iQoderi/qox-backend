'use strict';

const Controller = require('egg').Controller;

class ComponentController extends Controller {
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;

    const row = Object.assign({}, body, {
      createAt: Date.now(),
      createBy: 'Qoder'
    });

    const isSuccess = await ctx.service.component.create(row);

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
