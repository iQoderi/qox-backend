'use strict';

module.exports = function (appInfo){
  const config = {
    mysql: {
      client: {
        host:'127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Qoder5143209',
        database: 'qox-database',
      },
      app: true,
      agent: false
    },
    email: {
      client: {
          host: 'smtp.163.com',
          secureConnection: true,
          port: 465,
          auth: {
              user: 'neuqstbysgl@163.com',
              pass: 'neuqst1314',
          },
      },
      from: 'neuqstbysgl@163.com',
      name: '东北大学秦皇岛分校数统教室管理系统',
      app: true,
      agent: false,
    },
    security: {
      csrf: {
        enable: false
      }
    }
  };
  
  return config;
};
