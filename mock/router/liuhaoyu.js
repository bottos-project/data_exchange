const Router = require('koa-router')
const router = new Router()
const liuhaoyu = require('../data/liuhaoyu')


router.post('/user/register',liuhaoyu.user_register)


module.exports = router.routes()