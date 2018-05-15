'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;

    
    const bundleUrl = await ctx.service.page.createPageBundle(body.components);

    body.components = JSON.stringify(body.components);
        
    const row = Object.assign({}, body, {
      createAt: Date.now(),
      createBy: 'Qoder',
      bundleUrl
    });

    const isSuccess = await ctx.service.page.create(row);    

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

  async destroy () {
    const { ctx } = this;
    const { query } = ctx.request;
    const result = await this.ctx.service.page.destroy(query.pageId);

    ctx.body = {
      code: 0
    };
  };
};

module.exports = PageController;
