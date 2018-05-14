'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;

    
    const bundleUrl = ctx.service.page.createPageBundle(body.components);

    body.components = JSON.stringify(body.components);
        
    const isSuccess = await ctx.service.page.create(body);

    // http://odljp7x9v.bkt.clouddn.com/code/npm/qox-component-test/0.0.3/index.cmd.js
    const { cdnPrefix, cdnSuffix } = ctx.app.config.url;

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
  
  async test(ctx) {
    const { body } = ctx.request;
    const bundleUrl = ctx.service.page.createPageBundle(body.components);

    return ctx.body = {
      code: 0
    };
  }
};

module.exports = PageController;
