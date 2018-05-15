'use strict';

const Controller = require('egg').Controller;
const request = require('request');

class QoxController extends Controller {
  async index() {
    const { ctx } = this;
    const { query: { pageId }, headers } = ctx.request;
    const UA = headers['user-agent'].toLowerCase();

    const pageData = await ctx.service.page.getPageInfo(pageId);

    if (UA.indexOf('weex') < 0) {
      const keyData = {
        title: pageData.name,
        bundleUrl: pageData.bundleUrl
      };

      await ctx.render('qox.html', keyData);
    } else {
      const page = await ctx.helper.fetchFile(pageData.bundleUrl);
      
      ctx.body = page;
    }
  }
};

module.exports = QoxController;
