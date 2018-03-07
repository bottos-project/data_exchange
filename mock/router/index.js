const Router = require('koa-router');
const route = new Router();

const yuanjunliang = require('./yuanjunliang')
const liuhaoyu = require('./liuhaoyu')
const yuanjia = require('./yuanjia')

module.exports = function (app){
    app.use(yuanjunliang);
    app.use(liuhaoyu);
    app.use(yuanjia);
    return ()=>{}
}
