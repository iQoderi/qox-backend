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

  async update(page) {
    const result = await this.app.mysql.update('page', page);

    return result;
  }

  async getNextAId() {
    const sql = 'SELECT auto_increment FROM information_schema.`TABLES` WHERE TABLE_SCHEMA="qox-database" AND TABLE_NAME="page"';
    const result = await this.app.mysql.query(sql);

    return result;
  }

  async createPageBundle(pageId, components) {
    const len = components.length;
    const { qiniu: qiniuConf, url: { cdn, cdnPrefix, cdnSuffix, gAliCdnPrefix, gAliCdnSuffix }, pageConf: { builtInlist, PI } } = this.ctx.app.config;
    let pageBundle = '// {"framework" : "Rax"}\n';

    for (let i = 0; i < len; i++) {
      const { name, version } = components[i];
      const componentBundleUrl = `${cdnPrefix}/${name}/${version}/${cdnSuffix}`;
      let componentBundle = '';

      try {
        console.log(componentBundleUrl);
       componentBundle = await this.ctx.helper.fetchFile(componentBundleUrl);        
      }catch(e) {
        console.log('error',e);
      }
      
      pageBundle += componentBundle;
    }

    const writeDir = path.join(__dirname, '../../bundleTmp');
    const writeFile = `${writeDir}/index.bundle.min.js`;

    return new Promise((resolve, reject) => {
      fs.writeFile(writeFile, pageBundle, { encoding:'utf-8' }, async (err) => {
        if (err) {
          return reject(err);
        }

        const qn = new Qiniu(qiniuConf.key);
        const uploadConf = {
          bucket: qiniuConf.uploadConf.bucket,
          key: `page/${pageId}/index.bundle.js`,
          localFile: writeFile
        };

        qn.forcePutFile(uploadConf).then((resp) => {
          const { key } = resp;
          const pageBundleUrl = `${cdn}/${key}`;

          // 异步删除暂存 bundle
          setTimeout(() => {
            rimraf(writeFile , () => {});
          }, 0);
          
          resolve(pageBundleUrl);       
        }).catch((err) => {
          console.log(err);
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

    return result[0]['COUNT(*)'];
  };
};

module.exports = PageService;
