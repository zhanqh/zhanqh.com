$(function(){
	$("#bus_reload").on('touchstart', function(){
		$(this).css("opacity", 0.3)
	}).on('touchend', function(){
		$(this).css("opacity", 1)
	})
	/* 页面加载后发起post请求更新路线信息、获取实时公交 */
	var routeId = $("#routeIdHidden").text()
	// console.log("测试"+routeId)
	var direction = 0
	$("#mainContainer").empty()
	$.post("/bus/routeStation/getByRouteIdAndDirection", {routeId: routeId, direction: direction}, function(data){
		var obj=JSON.parse(JSON.parse(data))	// JSON字符串中含有转义字符串，需调用两次JSON.parse()
		// console.log(obj)
		var lineObjArr = (obj.retData).l	// 路线信息数组
		var stations = []	// 站点名称数组
		$.each(lineObjArr, function(index, item){
			stations.push(item.n)	// 提取站点名称放到stations数组中
		})
		// console.log(stations)
		$.each(stations, function(index, item){		// 向页面插入全部公交站点
			$("#mainContainer").append('<div class="bus_station"><span onclick=" " id=station' + index + '>'+ item + '</span></div><div id=mark' + index + ' class="bus_mark"></div>')
		})
		var stationId = []	// 站点id数组
		$.each(lineObjArr, function(index, item){
			stationId.push(item.i)	// 提取站点id放到stations数组中
		})
		$.each(stationId, function(index, item){
			$("#station"+index).attr('data-sid', item)	//设置自定义属性data-sid绑定路线上站点的序列id
		})
	})
	$.post("/bus/runbus/getByRouteAndDirection", {routeId: routeId, direction: direction}, function(data){
		var obj=JSON.parse(JSON.parse(data))	// JSON字符串中含有转义字符串，需调用两次JSON.parse()
		/* 实时公交信息 */
		var bbl=[]		// 未进站公交
		var bl=[]		// 进站公交
		var cbbl={}		// 未进站重叠公交
		var cbl={}		// 进站重叠公交
		var dbbl=[]		// 未进站短线公交
		var dbl=[]		// 进站短线公交
		$.each(obj.retData, function(index, item) {
			if((item.bbl).length) {											// 判断当前位置是否存在公交
				if ((item.bbl)[0].t == 1) {
					bbl.push(index)
				} else{
					dbbl.push(index)
				}
				// ((item.bbl)[0].t == 1)?bbl.push(index):dbbl.push(index)		// t=1正常班次，t=2短线；将站点序号分别放入未进站正常公交数组bbl、短线公交数组dbbl
				if((item.bbl).length>1) {									// length>1则该位置存在2辆及以上公交
					cbbl[index] = (item.bbl).length
				}
			}
			if ((item.bl).length) {											// 判断当前站点是否存在公交
				if ((item.bl)[0].t == 1) {
					bl.push(index)
				} else{
					dbl.push(index)
				}
				// ((item.bl)[0].t == 1)?bl.push(index):dbl.push(index);		// t=1正常班次，t=2短线；将站点序号分别放入到站正常公交数组bl、短线公交数组dbl
				if((item.bl).length>1) {									// length>1则该位置存在2辆及以上公交
					cbl[index] = (item.bl).length
				}
			}
		})
		
		$.each(bbl, function(index, item){		// 标记未进站公交，插入图标
			$("#mark"+item).append('<img class="bus_icon" src="/images/icon_bus.png">')
		})
		$.each(bl, function(index, item){		// 标记进站公交，伪元素背景图片显示图标
			$('head').append('<style>#station' + item + ':after{content: "";background-image: url(/images/icon_bus.png);background-size: 25px 25px;position: absolute;width: 25px;height: 25px;transform: translateX(10px);}</style>');
		})
		$.each(dbbl, function(index, item){		// 短线未进站公交，插入图标
			$("#mark"+item).append('<img class="bus_icon" src="/images/icon_bus_d2.png">')
		})
		$.each(dbl, function(index, item){		// 标记进站短线公交，伪元素背景图片显示图标
			$('head').append('<style>#station' + item + ':after{content: "";background-image: url(/images/icon_bus_d2.png);background-size: 25px 25px;position: absolute;width: 25px;height: 25px;transform: translateX(10px);}</style>');
		})
		if (!$.isEmptyObject(cbbl)) {			// 判断是否存在未进站重叠公交
			$.each(cbbl, function(key, value){	// 插入重叠数量的图标
				for (var i = 1; i < value; i++) {
					$("#mark"+key).append('<img class="bus_icon" src="/images/icon_bus.png">')
				}
			})
		}
		if (!$.isEmptyObject(cbl)) {			// 判断是否存在进站重叠公交
			$.each(cbl, function(key, value){	// 通过修改伪元素宽度以重复图标，标识重叠数量
				$('head').append('<style>#station' + key + ':after{content: "";width: ' + value*25 + 'px;}</style>');
			})
		}
	})
	/* 页面加载后发起post请求更新路线信息、获取实时公交 */
	
	/* 返程 */
	$("#bus_weui_btn").click(function(){
		$("#mainContainer").empty()
		$("head style").detach()
		wait_flag = 0
		$(".bus_wait_time").text()
		$(".bus_wait_stations").text()
		$("#footer_tip").show()



		if (direction) {direction=0} else{direction=1}
		/* 获取返程路线站点 */
		$.post("/bus/routeStation/getByRouteIdAndDirection", {routeId: routeId, direction: direction}, function(data){
			var obj=JSON.parse(JSON.parse(data))	// JSON字符串中含有转义字符串，需调用两次JSON.parse()
			console.log(obj)
			$("#bus_route_name").text((obj.retData).rn)		// 向页面插入路线名称
			var firstTime = ((obj.retData).ft).substr(0, 2) + ":" + ((obj.retData).ft).substr(2, 2)
			var lastTime = ((obj.retData).lt).substr(0, 2) + ":" + ((obj.retData).lt).substr(2, 2)
			$("#bus_route_time").text("首末班：" + firstTime + "-" + lastTime)	// 向页面插入首末班信息
			var lineObjArr = (obj.retData).l	// 路线信息数组
			var stations = []	// 站点名称数组
			$.each(lineObjArr, function(index, item){
				stations.push(item.n)	// 提取站点名称放到stations数组中
			})
			// console.log(stations)
			$("#bus_route_fromto").text(stations[0] + " → " + stations[(stations.length)-1])	// 向页面插入起点终点信息
			$.each(stations, function(index, item){		// 向页面插入全部公交站点
				$("#mainContainer").append('<div class="bus_station"><span onclick=" " id=station' + index + '>'+ item + '</span></div><div id=mark' + index + ' class="bus_mark"></div>')
			})
			var stationId = []	// 站点id数组
			$.each(lineObjArr, function(index, item){
				stationId.push(item.i)	// 提取站点id放到stations数组中
			})
			$.each(stationId, function(index, item){
				$("#station"+index).attr('data-sid', item)	//设置自定义属性data-sid绑定路线上站点的序列id
			})
		})
		/* 获取返程实时公交信息 */
		$.post("/bus/runbus/getByRouteAndDirection", {routeId: routeId, direction: direction}, function(data){
			var obj=JSON.parse(JSON.parse(data))	// JSON字符串中含有转义字符串，需调用两次JSON.parse()
			/* 实时公交信息 */
			var bbl=[]		// 未进站公交
			var bl=[]		// 进站公交
			var cbbl={}		// 未进站重叠公交
			var cbl={}		// 进站重叠公交
			var dbbl=[]		// 未进站短线公交
			var dbl=[]		// 进站短线公交
			$.each(obj.retData, function(index, item) {
				if((item.bbl).length) {											// 判断当前位置是否存在公交
					((item.bbl)[0].t == 1)?bbl.push(index):dbbl.push(index)		// t=1正常班次，t=2短线；将站点序号分别放入未进站正常公交数组bbl、短线公交数组dbbl
					if((item.bbl).length>1) {									// length>1则该位置存在2辆及以上公交
						cbbl[index] = (item.bbl).length
					}
				}
				if ((item.bl).length) {											// 判断当前站点是否存在公交
					((item.bl)[0].t == 1)?bl.push(index):dbl.push(index);		// t=1正常班次，t=2短线；将站点序号分别放入到站正常公交数组bl、短线公交数组dbl
					if((item.bl).length>1) {									// length>1则该位置存在2辆及以上公交
						cbl[index] = (item.bl).length
					}
				}
			})
			
			$.each(bbl, function(index, item){		// 标记未进站公交，插入图标
				$("#mark"+item).append('<img class="bus_icon" src="/images/icon_bus.png">')
			})
			$.each(bl, function(index, item){		// 标记进站公交，伪元素背景图片显示图标
				$('head').append('<style>#station' + item + ':after{content: "";background-image: url(/images/icon_bus.png);background-size: 25px 25px;position: absolute;width: 25px;height: 25px;transform: translateX(10px);}</style>');
			})
			$.each(dbbl, function(index, item){		// 短线未进站公交，插入图标
				$("#mark"+item).append('<img class="bus_icon" src="/images/icon_bus_d2.png">')
			})
			$.each(dbl, function(index, item){		// 标记进站短线公交，伪元素背景图片显示图标
				$('head').append('<style>#station' + item + ':after{content: "";background-image: url(/images/icon_bus_d2.png);background-size: 25px 25px;position: absolute;width: 25px;height: 25px;transform: translateX(10px);}</style>');
			})
			if (!$.isEmptyObject(cbbl)) {			// 判断是否存在未进站重叠公交
				$.each(cbbl, function(key, value){	// 插入重叠数量的图标
					for (var i = 1; i < value; i++) {
						$("#mark"+key).append('<img class="bus_icon" src="/images/icon_bus.png">')
					}
				})
			}
			if (!$.isEmptyObject(cbl)) {			// 判断是否存在进站重叠公交
				$.each(cbl, function(key, value){	// 通过修改伪元素宽度以重复图标，标识重叠数量
					$('head').append('<style>#station' + key + ':after{content: "";width: ' + value*25 + 'px;}</style>');
				})
			}
			// console.log("bbl："+bbl)
			// console.log("bbl："+bl)
		})
	})
	/* 返程 */

	/* 点击站点获取等待消息 */
	var wait_flag = 0
	var stationId
	var routeStationId
	$("body").on("click", ".bus_station span", function(){
		wait_flag = 1
		// console.log(wait_flag)
		$("#footer_tip").hide()
		routeStationId = $(this).attr("data-sid")
		$("#"+stationId).removeClass("selected")
		stationId = $(this).attr("id")
		// console.log("测试"+stationId)
		$("#"+stationId).addClass("selected")
		// $("head").append('<style>#' + stationId + ':before{content: "";background-image: url(/images/icon_nav_75.png);background-size: 25px 25px;position: absolute;width: 25px;height: 25px;transform: translateX(-25px);}</style>')
		$.post("/bus/info/waitTime", {routeStationId: routeStationId}, function(data){
			var obj=JSON.parse(JSON.parse(data))	// JSON字符串中含有转义字符串，需调用两次JSON.parse()
			$.each(obj.retData.list, function(index, item){
				$(".bus_none").text("")
				if (item.count != '-1') {
					$("#bus_wait_time"+index).text(item.time + "′")
					$("#bus_wait_stations"+index).text(item.count + "站")
				} else{
					$("#bus_wait_time"+index).text("0")
					$("#bus_wait_stations"+index).text("未发车")
				}
			})
		})
	})
	/* 点击站点获取等待消息 */

	/* 刷新 */
	$("#bus_reload").click(function(){
		/* 刷新实时公交位置 */
		$.post("/bus/runbus/getByRouteAndDirection", {routeId: routeId, direction: direction}, function(data){
			var obj=JSON.parse(JSON.parse(data))	// JSON字符串中含有转义字符串，需调用两次JSON.parse()
			/* 实时公交信息 */
			var bbl=[]		// 未进站公交
			var bl=[]		// 进站公交
			var cbbl={}		// 未进站重叠公交
			var cbl={}		// 进站重叠公交
			var dbbl=[]		// 未进站短线公交
			var dbl=[]		// 进站短线公交
			$.each(obj.retData, function(index, item) {
				if((item.bbl).length) {											// 判断当前位置是否存在公交
					((item.bbl)[0].t == 1)?bbl.push(index):dbbl.push(index)		// t=1正常班次，t=2短线；将站点序号分别放入未进站正常公交数组bbl、短线公交数组dbbl
					if((item.bbl).length>1) {									// length>1则该位置存在2辆及以上公交
						cbbl[index] = (item.bbl).length
					}
				}
				if ((item.bl).length) {											// 判断当前站点是否存在公交
					((item.bl)[0].t == 1)?bl.push(index):dbl.push(index);		// t=1正常班次，t=2短线；将站点序号分别放入到站正常公交数组bl、短线公交数组dbl
					if((item.bl).length>1) {									// length>1则该位置存在2辆及以上公交
						cbl[index] = (item.bl).length
					}
				}
			})
			
			$("head style").detach()	// 清空到站公交标记
			$(".bus_mark").empty()		// 清空未进站公交标记

			$.each(bbl, function(index, item){		// 标记未进站公交，插入图标
				$("#mark"+item).append('<img class="bus_icon" src="/images/icon_bus.png">')
			})
			$.each(bl, function(index, item){		// 标记进站公交，伪元素背景图片显示图标
				$('head').append('<style>#station' + item + ':after{content: "";background-image: url(/images/icon_bus.png);background-size: 25px 25px;position: absolute;width: 25px;height: 25px;transform: translateX(10px);}</style>');
			})
			$.each(dbbl, function(index, item){		// 短线未进站公交，插入图标
				$("#mark"+item).append('<img class="bus_icon" src="/images/icon_bus_d2.png">')
			})
			$.each(dbl, function(index, item){		// 标记进站短线公交，伪元素背景图片显示图标
				$('head').append('<style>#station' + item + ':after{content: "";background-image: url(/images/icon_bus_d2.png);background-size: 25px 25px;position: absolute;width: 25px;height: 25px;transform: translateX(10px);}</style>');
			})
			if (!$.isEmptyObject(cbbl)) {			// 判断是否存在未进站重叠公交
				$.each(cbbl, function(key, value){	// 插入重叠数量的图标
					for (var i = 1; i < value; i++) {
						$("#mark"+key).append('<img class="bus_icon" src="/images/icon_bus.png">')
					}
				})
			}
			if (!$.isEmptyObject(cbl)) {			// 判断是否存在进站重叠公交
				$.each(cbl, function(key, value){	// 通过修改伪元素宽度以重复图标，标识重叠数量
					$('head').append('<style>#station' + key + ':after{content: "";width: ' + value*25 + 'px;}</style>');
				})
			}
			// console.log("bbl："+bbl)
			// console.log("bbl："+bl)
		})
		if (wait_flag) {
			$.post("/bus/info/waitTime", {routeStationId: routeStationId}, function(data){
				var obj=JSON.parse(JSON.parse(data))	// JSON字符串中含有转义字符串，需调用两次JSON.parse()
				$.each(obj.retData.list, function(index, item){
					$(".bus_none").text("")
					if (item.count != '-1') {
						$("#bus_wait_time"+index).text(item.time + "′")
						$("#bus_wait_stations"+index).text(item.count + "站")
					} else{
						$("#bus_wait_time"+index).text("0")
						$("#bus_wait_stations"+index).text("未发车")
					}
				})
			})
		}

	})
	/* 刷新 */


})