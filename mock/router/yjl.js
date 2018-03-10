const Router = require('koa-router')
const router = new Router()
const yjl = require('../data/yjl')


router.post('/user/register',yjl.user_register)
router.post('/user/login',yjl.user_login)
router.post('/user/logout',yjl.user_logout)
router.get('/user/GetBlockInfo',yjl.get_block_info)
router.post('/user/GetBin',yjl.get_bin)
router.post('/asset/register',yjl.asset_register)
router.post('/asset/query',yjl.asset_query)
router.post('/asset/buy/query',yjl.asset_buy_query)
router.post('/asset/publish/query',yjl.asset_publish_query)
router.post('/requirement/query',yjl.requirement_query)


module.exports = router.routes()