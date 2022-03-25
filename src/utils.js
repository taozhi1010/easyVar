var _ = require('lodash');
// @ts-ignore
const request = require('request');

// 文本转小驼峰
export function camelCase(text) {
    return _.camelCase(text);
}

export  function requestGET(url) {
     request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('--body', body);
        }
    })
}