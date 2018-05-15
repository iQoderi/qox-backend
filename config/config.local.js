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
    },
    url: {
      cdn: 'http://odljp7x9v.bkt.clouddn.com',
      cdnPrefix: 'http://odljp7x9v.bkt.clouddn.com/code/npm',
      cdnSuffix: 'index.cmd.js',
    },
    qiniu: {
      uploadConf: {
        bucket: 'neuqst'
      },
      key: {
        ak: '6dq3o_p6-n0nh3-StBsjiS7b0SP6us7aJrTrtMZV',
        sk: 'F0xhJzVnCJSePA41IMDG7t8bmggSA6AlVdvosOfJ'
      }
    }
  };
  
  return config;
};
