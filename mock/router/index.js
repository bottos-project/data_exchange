const Router = require('koa-router');
const route = new Router();

const yjl = require('./yjl')
const lhy = require('./lhy')
const yj = require('./yj')

module.exports = function (app){
    app.use(yjl);
    app.use(lhy);
    app.use(yj);
    return ()=>{}
}
