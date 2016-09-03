/* GET 请求博客页面 */
/* 路由级中间件 */

var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.send('博客')
})

module.exports = router