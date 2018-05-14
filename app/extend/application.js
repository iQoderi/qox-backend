'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  routerLoader() {
    const routerDir = path.join(__dirname, '../router');
    const result = fs.readdirSync(routerDir);
    
    result.forEach((file) => {
      const routerPath = `${routerDir}/${file}`;
      const router = require(routerPath);

      if (typeof router === 'function') {
          console.log(`router loaded: ${router}`);
          router(this);
      }
    });
  }
};
