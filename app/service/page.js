'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');
const Qiniu = require('qiniu-sdk');
const fetch = require('isomorphic-fetch');

class PageService extends Service {
  async create(page) {
    const result = await this.app.mysql.insert('page', page);
    const insertSuccess = result.affectedRows === 1;

    return insertSuccess;
  };

  async createPageBundle(components) {
    const len = components.length;
    const { cdnPrefix, cdnSuffix } = this.ctx.app.config.url;
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
        if (error) {
          return reject(error);
        }
      });
    });
  };
};

module.exports = PageService;
