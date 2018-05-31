'use strict';

const Service = require('egg').Service;

class ComponentService extends Service {
  async create(component) {
    const result = await this.app.mysql.insert('component', component);
    const insertSuccess = result.affectedRows === 1;

    return insertSuccess;
  };

  async update(row) {
    const result = await this.app.mysql.update('component', row);    

    return result;
  };
  
  async detail(componentId) {
    const result = await this.app.mysql.get('component', {
      id: componentId
    });

    return result;
  };

  async list(option) {
    const result = await this.app.mysql.select('component', option);

    return result;
  };
  
  async count() {
    const sql = 'SELECT COUNT(*) FROM component';
    const result = await this.app.mysql.query(sql);

    return result[0]['COUNT(*)'];
  };
  
};

module.exports = ComponentService;
