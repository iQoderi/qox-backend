'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const Qiniu = require('qiniu-sdk');

class PageService extends Service {
  async create(page) {
    const result = await this.app.mysql.insert('page', page);
    const insertSuccess = result.affectedRows === 1;

    return insertSuccess;
  };

  async createPageBundle(components) {
    const len = components.length;
    const { qiniu: qiniuConf, url: { cdn, cdnPrefix, cdnSuffix } } = this.ctx.app.config;
    let pageBundle = '// {"framework" : "Rax"}\n';

    for (let i = 0; i < len; i++) {
      const { name, version } = components[i];
      const componentBundleUrl = `${cdnPrefix}/${name}/${version}/${cdnSuffix}`;
      const componentBundle = await this.ctx.helper.fetchFile(componentBundleUrl);
      
      pageBundle += componentBundle;
    }

    const writeDir = path.join(__dirname, '../../bundleTmp');
    const writeFile = `${writeDir}/index.bundle.min.js`;

    return new Promise((resolve, reject) => {
      fs.writeFile(writeFile, pageBundle, { encoding:'utf-8' }, (err) => {
        if (err) {
          return reject(err);
        }

        const qn = new Qiniu(qiniuConf.key);
        const uploadConf = {
          bucket: qiniuConf.uploadConf.bucket,
          filePrefix: 'page',
          key: `test/index.bundle.js`,
          localFile: writeFile
        };

        qn.putFile(uploadConf).then((resp) => {
          const { key } = resp;
          const pageBundleUrl = `${cdn}/${key}`;

          // 异步删除暂存 bundle
          setTimeout(() => {
            rimraf(writeFile , () => {});
          }, 0);  
          resolve(pageBundleUrl);       
        }).catch((err) => {
          reject(err);
        });
      });
    });
  };
};

module.exports = PageService;
