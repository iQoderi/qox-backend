'use strict';

const Controller = require('egg').Controller;

class QoxController extends Controller {
  async index() {
    const { ctx } = this;
    const { pageId } = ctx.request.query;

    // console.log(ctx.request.headers);
    const pageData = await ctx.service.page.getPageInfo(pageId);

    const keyData = {
      title: pageData.name,
      bundleUrl: pageData.bundleUrl
    };

    console.log(keyData);
    await ctx.render('qox.html', keyData);
  }
};

module.exports = QoxController;
