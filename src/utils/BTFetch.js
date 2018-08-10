/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
import config from './config.js'
const pkg = require('../../package.json')

const BTFetch = (url, method, params, options = {
    full_path:false,
    service:'service'
}) => {
    window.message.destroy()
    let blockchain = config.blockchain;
    let service = config.service;
    let mock = config.mock;
    let reqUrl = ''

    if(pkg.MOCK){
        reqUrl = mock.base_url+url
    }else{
        reqUrl = service.base_url + service.version + url
    }

    // 如果自己写的全路径，直接用全路径
    if(options.full_path) reqUrl = url;

    let methodUpStr = method.toUpperCase(); // 统一转换成大写
    let requestParams = {
        method: methodUpStr,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (methodUpStr == 'GET') {
        let str = getFetchUrl(params);
        reqUrl += str;
    }else{
        requestParams.body = JSON.stringify(params);
    }
    return fetch(reqUrl, requestParams)
    .then(response => response.json())
    .catch(error=> console.error(error));
}

/**
 * 返回get请求的请求地址
 * @param params
 * @returns {string}
 */
const getFetchUrl = (params)=>{
    let str = '';
    if (typeof params === 'object' && params) {
        str += '?';
        for (let key in params) {
            str += key + '=' + params[key] + '&';
        }
    }
    return str;
}


/**
 * post方式ContentType:urlencode 时的body参数
 * @param params
 * @returns {string}
 */
const getUrlencode = (params)=>{
    let str = '';
    if (typeof params === 'object' && params) {
        for (let key in params) {
            let paramKeyStr = ''
            if(typeof params[key] ==='object'){
                paramKeyStr = getUrlencode(params[key]);
            }else {
                paramKeyStr = params[key];
            }
            str += key + '=' + paramKeyStr + '&';
        }

    }
    return str;
}

export default BTFetch
