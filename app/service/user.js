'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findUserByMail(email) {
    const result = await this.app.mysql.get('user', { email });
    
    return result;
  }

  async findUserById(uid) {
    const result = await this.app.mysql.get('user', { id: uid });

    return result;
  }
};

module.exports = UserService;
