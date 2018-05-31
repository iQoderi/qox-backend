'use strict';

const Service = require('egg').Service;

class GlobalConfService extends Service {
  async create(row) {
    const result = await this.app.mysql.insert('globalConf', row);    

    return result;
  }

  async update(row) {
    const result = await this.app.mysql.update('globalConf', row);    

    return result;
  }

  async get() {
    const result = await this.app.mysql.select('globalConf');

    return result[0];
  }
};

module.exports = GlobalConfService;
