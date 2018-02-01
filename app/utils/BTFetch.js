import config from './config.js'
module.exports = (url,params,options)=>{
    let {method,type} = options;

    let reqUrl = config.baseUrl + version + '/' + url;
    return fetch(reqUrl,{
        method:method || 'POST',
        headers:{
            'Content-Type':type || 'application/json'
        },
        body:JSON.stringify(params)
    }).then((response)=>{return response.json()})
}

