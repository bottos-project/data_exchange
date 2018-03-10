const Router = require('koa-router')
const router = new Router()
const lhy = require('../data/lhy')


router.post('/user/register',lhy.user_register)


module.exports = router.routes()