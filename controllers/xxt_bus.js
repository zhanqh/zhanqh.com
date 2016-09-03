var http = require('http')
var querystring = require('querystring')
var base = require('./base')


/* 通过路线名查找 */
function xxt_bus(queryData, path){
	var params = base.createBase(queryData)

	var postData = querystring.stringify(params)

	var options = {
		hostname: 'nxxtapi.gzyyjt.net',
		port: '9009',
		path: path,
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postData.length
		}
	}
	var result = ''	// 用于储存post请求返回结果，使用promise的resolve方法传递给then函数

	var p = new Promise(function(resolve, reject){

		var req = http.request(options, function(res) {
			if (res.statusCode === 200){
				console.log('STATUS: ' + res.statusCode)
				console.log('HEADERS: ' + JSON.stringify(res.headers))
				res.setEncoding('utf8')
				res.on('data', function (chunk) {
					result += chunk
					// console.log('BODY: ' + chunk)
				})
				res.on('end', function(){
					resolve(result)		// 将result的值传递给then方法的回调函数
				})
			} 
		})

		req.on('error', function(e) {
			reject(e.message)	// 将错误信息传递给then方法的回调函数
			console.log('problem with request: ' + e.message)
		})

		// write data to request body
		req.write(postData)
		req.end()
	})
	return p
}


exports.xxt_bus = xxt_bus