const Router = require('koa-router')
const router = new Router()
const yuanjia = require('../data/yuanjia')


router.post('/user/register',yuanjia.user_register)


module.exports = router.routes()