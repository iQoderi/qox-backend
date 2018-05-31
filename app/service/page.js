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

    return result.insertId;
  };

  async getNextAId() {
    const sql = 'SELECT auto_increment FROM information_schema.`TABLES` WHERE TABLE_SCHEMA="qox-database" AND TABLE_NAME="page"';
    const result = await this.app.mysql.query(sql);

    return result;
  }

  async createPageBundle(components) {
    const len = components.length;
    const { qiniu: qiniuConf, url: { cdn, cdnPrefix, cdnSuffix, gAliCdnPrefix, gAliCdnSuffix }, pageConf: { builtInlist, PI } } = this.ctx.app.config;
    let pageBundle = '// {"framework" : "Rax"}\n';

    await this.getNextAId();

    for (let i = 0; i < len; i++) {
      const { name, version } = bui [i];
      const componentBundleUrl = `${cdnPrefix}/${name}/${version}/${cdnSuffix}`;
      const componentBundle = await this.ctx.helper.fetchFile(componentBundleUrl);
      
      pageBundle += componentBundle;
    }

    for (let i = 0; i < len; i++) {
      const { name, version } = components[i];
      const componentBundleUrl = `${cdnPrefix}/${name}/${version}/${cdnSuffix}`;
      const componentBundle = await this.ctx.helper.fetchFile(componentBundleUrl);
      
      pageBundle += componentBundle;
    }

    const writeDir = path.join(__dirname, '../../bundleTmp');
    const writeFile = `${writeDir}/index.bundle.min.js`;

    return new Promise((resolve, reject) => {
      fs.writeFile(writeFile, pageBundle, { encoding:'utf-8' }, async (err) => {
        if (err) {
          return reject(err);
        }

        const result = await this.getNextAId();
        const nextId = result[0].auto_increment;
        const qn = new Qiniu(qiniuConf.key);
        const uploadConf = {
          bucket: qiniuConf.uploadConf.bucket,
          filePrefix: 'page',
          key: `${nextId}/index.bundle.js`,
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

  async destroy(pageId) {
    const result = this.app.mysql.delete('page', {
      id: pageId
    });

    return result;
  };
  
  async getPageInfo(pageId) {
    const result = await this.app.mysql.get('page', {
      id: pageId
    });

    return result;
  };

  async list(option) {
    const result = await this.app.mysql.select('page', option);

    return result;
  };
  
  async count() {
    const sql = 'SELECT COUNT(*) FROM page';
    const result = await this.app.mysql.query(sql);

    console.log(result);

    return result[0]['COUNT(*)'];
  };
};

module.exports = PageService;
