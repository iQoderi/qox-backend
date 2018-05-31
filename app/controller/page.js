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

  async build() {
    const { ctx } = this;
    const { body, query } = ctx.request;

    
    const bundleUrl = await ctx.service.page.createPageBundle(query.pageId, body.components);

    body.components = JSON.stringify(body.components);
        
    const row = Object.assign({}, body, {
      createAt: Date.now(),
      createBy: 'Qoder',
      bundleUrl,
      id: query.pageId
    });

    console.log(row);
    
    const isSuccess = await ctx.service.page.update(row);    

    if (isSuccess) {
      ctx.body = {
          code: 0,
          data: {
            bundleUrl
          }
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

    let modules  = [];
    if (result.components) {
      modules = JSON.parse(result.components).map((module) => {
        return {
          moduleId: module.id,
          moduleName: module.name,
          moduleVersion: module.version
        };
      });
    }

    ctx.body = {
      code: 0,
      data: {
        modules
      }
    };
  }

  async components() {
    const { ctx } = this;
    const { query } = ctx.request;

    const result = await this.ctx.service.page.getPageInfo(query.pageId);

    let modules  = [];
    if (result.components) {
      // modules = JSON.parse(result.components).map((module) => {
      //   return {
      //     moduleId: module.id,
      //     moduleName: module.name,
      //     moduleVersion: module.version
      //   };
      // });
      const components = JSON.parse(result.components);
      const len = components.length;

      for (let i = 0; i < len; i++) {
        const item = components[i];
        const componet = await ctx.service.component.detail(item.id);

        modules.push(componet);
      }
    }

    ctx.body = {
      code: 0,
      data: {
        modules
      }
    };
  }

  async list() {
    const { ctx } = this;
    const { query } = ctx.request;
    let { limit = 10, page = 0 } = query;

    if (page <= 0) {
      page = 0;
    }

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = page * limit;

    const option = {
      offset,
      limit,
      orders: [['id', 'desc']]
    };


    const list = await ctx.service.page.list(option);
    const total = await ctx.service.page.count();

    const _page = {
      current: page,
      limit,
      total
    };

    ctx.body = {
      code: 0,
      data: {
        list,
        page: _page
      }
    };
  }
};

module.exports = PageController;
