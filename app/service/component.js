'use strict';

const Service = require('egg').Service;

class ComponentService extends Service {
  async create(component) {
    const result = await this.app.mysql.insert('component', component);
    const insertSuccess = result.affectedRows === 1;

    return insertSuccess;
  };
};

module.exports = ComponentService;
