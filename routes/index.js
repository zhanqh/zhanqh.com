/* GET 请求主页 */
/* 路由级中间件 */

var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.send('zhanqh主页')
})

module.exports = router