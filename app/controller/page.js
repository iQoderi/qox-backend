'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;

    body.components = JSON.stringify(body.components);

    const isSuccess = await ctx.service.page.create(body);

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

};

module.exports = PageController;
