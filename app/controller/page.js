'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
  async register() {
    const { ctx } = this;
    const { body } = ctx.request;

    const row = Object.assign({}, body, {
      createAt: Date.now(),
      createBy: 'Qoder',
    });

    const pageId = await ctx.service.page.create(row);
    
    if (pageId) {
      ctx.body = {
          code: 0,
          data: {
            pageId
          }
      };
    } else {
      ctx.body = {
        code: -1
      };
    }
  }

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

  async destroy() {
    const { ctx } = this;
    const { query } = ctx.request;
    const result = await this.ctx.service.page.destroy(query.pageId);

    ctx.body = {
      code: 0
    };
  };

  async info() {
    const { ctx } = this;
    const { query } = ctx.request;

    const result = await this.ctx.service.page.getPageInfo(query.pageId);

    ctx.body = {
      code: 0,
      data: {
        pageInfo: result
      }
    };
  }

  async modules() {
    const { ctx } = this;
    const { query } = ctx.request;

    const result = await this.ctx.service.page.getPageInfo(query.pageId);

    let modules = JSON.parse(result.components).map((module) => {
      return {
        moduleId: module.id,
        moduleName: module.name,
        moduleVersion: module.verion
      };
    });

    ctx.body = {
      code: 0,
      data: {
        modules
      }
    };
  }

  async list() {
    const { ctx } = this;
    
  }
};

module.exports = PageController;
