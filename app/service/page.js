'use strict';

const Service = require('egg').Service;

class PageService extends Service {
  async create(page) {
    const result = await this.app.mysql.insert('page', page);
    const insertSuccess = result.affectedRows === 1;

    return insertSuccess;
  };
};

module.exports = PageService;
