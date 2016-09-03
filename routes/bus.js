/* GET 公交查询 */
/* 路由级中间件 */

var express = require('express')
var router = express.Router()
var xxt_bus = require('../controllers/xxt_bus')

// body-parser 解析post请求参数
var bodyParser = require('body-parser')
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var queryData // 查询数据，obj
var path // post请求路径，string

function _calGetByName(req, res, next){
	// 生成查询对象数据
	queryData = {
		name: req.body.name
	}
	// 设置post请求路径
	path = '/xxt_api/bus/getByName'
	next()
}

function _calRouteStation(req, res, next){
	// 生成查询对象数据
	queryData = {
		routeId: req.body.routeId,
		direction: req.body.direction
	}
	// 设置post请求路径
	path = '/xxt_api/bus/routeStation/getByRouteIdAndDirection'
	next()
}

function _calGetRouteStation(req, res, next){
	// 生成查询对象数据
	queryData = {
		routeId: req.query.routeId,
		direction: '0'
	}
	// 设置post请求路径
	path = '/xxt_api/bus/routeStation/getByRouteIdAndDirection'
	next()
}

function _calRunBus(req, res, next){
	// 生成查询对象数据
	queryData = {
		routeId: req.body.routeId,
		direction: req.body.direction
	}
	// 设置post请求路径
	path = '/xxt_api/bus/runbus/getByRouteAndDirection'
	next()
}

function _calInfo(req, res, next){
	// 生成查询对象数据
	queryData = {
		num: 3,
		routeStationId: req.body.routeStationId
	}
	// 设置post请求路径
	path = '/xxt_api/bus/info/waitTime'
	next()
}




// 首页
router.get('/', function(req, res) {
	res.render('bus_index')
})


/* 首页搜索路由 getByName */
router.post('/getByName', urlencodedParser, _calGetByName, function(req, res, next){
	xxt_bus.xxt_bus(queryData, path).then(function(data){
		// console.log(data)
		res.send(JSON.stringify(data))
	})
})
/* getByName */


/* 首页搜索结果列表点击跳转路由处理，获取get请求url参数 */
router.get('/rs', _calGetRouteStation, function(req, res) {
	xxt_bus.xxt_bus(queryData, path).then(function(data){
		var retRouteStation=JSON.parse(data)
		var rsObj={}	// 生成jade模板对象数据
		var firstTime = ((retRouteStation.retData).ft).substr(0, 2) + ":" + ((retRouteStation.retData).ft).substr(2, 2)
		var lastTime = ((retRouteStation.retData).lt).substr(0, 2) + ":" + ((retRouteStation.retData).lt).substr(2, 2)

		rsObj.rn = retRouteStation.retData.rn	// 路线名称
		rsObj.ft = firstTime		// 首班时间
		rsObj.lt = lastTime		// 末班时间
		var arr=[]					// 站点名称数组
		var lineObjArr = (retRouteStation.retData).l	// 获取站点详情数组

		lineObjArr.forEach(function (item, index) {
			arr.push(item.n)		// 提取站点名称放入站点数组中
		})

		rsObj.arr = arr
		rsObj.start = arr[0]		// 起点站
		rsObj.end = arr[lineObjArr.length-1]		// 终点站
		rsObj.rid = req.query.routeId

		// console.log(req.query.routeId)
		res.render('bus_spa', rsObj)
	})

})
/* 首页搜索结果列表点击跳转路由处理，获取get请求url参数 */


/* routeStation_getByRouteIdAndDirection */
router.post('/routeStation/getByRouteIdAndDirection', urlencodedParser, _calRouteStation, function(req, res, next){
	xxt_bus.xxt_bus(queryData, path).then(function(data){
		// console.log(data)
		res.send(JSON.stringify(data))
	})
})
/* routeStation_getByRouteIdAndDirection */


/* runbus_getByRouteAndDirection */
router.post('/runbus/getByRouteAndDirection', urlencodedParser, _calRunBus, function(req, res, next){
	xxt_bus.xxt_bus(queryData, path).then(function(data){
		// console.log(data)
		res.send(JSON.stringify(data))
	})
})
/* runbus_getByRouteAndDirection */


/* info_waitTime */
router.post('/info/waitTime', urlencodedParser, _calInfo, function(req, res, next){
	xxt_bus.xxt_bus(queryData, path).then(function(data){
		// console.log(data)
		res.send(JSON.stringify(data))
	})
})
/* info_waitTime */



module.exports = router