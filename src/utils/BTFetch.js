import config from './config.js'

export default (url,method,params,SERVER="service")=>{
    let blockchain = config.blockchain;
    let service = config.service;
    let reqUrl = ''
    if(SERVER==='service'){
        reqUrl = service.base_url + service.version+url
    }else{
        reqUrl = blockchain.base_url + blockchain.version
    }

    let methodUpStr = method.toUpperCase(); // 统一转换成大写
    let requestParams = {
        method: methodUpStr,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (methodUpStr == 'GET') {
        let str = getFetchUrl(params);
        reqUrl += str;
    }else{
        requestParams.body = JSON.stringify(params);
    }

    return fetch(reqUrl, requestParams)
    .then(response => response.json());
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
  
  