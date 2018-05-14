"use strict";

const fetch = require('isomorphic-fetch');

module.exports = {
    url() {
        const { apiUrl } = this.app.config;

        return {
            res(url) {
                return `${apiUrl.resUrlPrefix}/${url}`;
            },
            app(url) {
                return `${apiUrl.appUrlPrefix}/${url}`;
            },
            pic(url) {
                return `${apiUrl.picUrlPrefix}/${url}`;
            },
        }
    },
    createRule(rules) {
        const res = {};

        if (Array.isArray(rules)) {
            rules.forEach((rule) => {
                if (typeof rule === 'string') {
                    res[rule] = { type: 'string' };
                } else {
                    const { name, type } = rule;
                    res[name] = { type };
                }
            });

            return res;
        } else {
            throw new Error(`unExpected type of rule ${typeof rules}`);
        }
    },
    dropField(fields, drops) {
        drops.forEach((drop) => {
            if (fields.hasOwnProperty(drop)) {
                delete  fields[drop];
            }
        });
    },
    fetchFile(path) {
        return fetch(path).then((res) => {
            return res.body;
        }).then((body) => {
            return body._outBuffer.toString();
        });
    },
    comboBundle(bundleContent) {
        const bundleStart = '// {"framework" : "Rax"}';
        const bundle = bundleStart + bundleContent;

        
    }
};
