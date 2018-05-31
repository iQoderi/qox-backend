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

  async update() {
    const { ctx } = this;
    const { body, query } = ctx.request;

    const row = Object.assign({}, body, {
      updateAt: Date.now(),
      updateBy: 'Qoder',
      id: query.componentId
    });

    const isSuccess = await ctx.service.component.update(row);

    ctx.body = {
      code: 0
    };
  };
  
  async detail() {
    const { ctx } = this;
    const { query: { componentId } } = ctx.request;

    const result = await ctx.service.component.detail(componentId);

    ctx.body = {
      code: 0,
      data: {
        component: result
      }
    };
  };

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


    const list = await ctx.service.component.list(option);
    const total = await ctx.service.component.count();

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
}

module.exports = ComponentController;
