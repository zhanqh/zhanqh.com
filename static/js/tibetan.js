var tibetanChart = echarts.init(document.getElementById('tibetan'));
 
var geoCoordMap = {
    '北京': [116.4551, 40.2539],
    '上海': [121.4648, 31.2891],
    '天津': [117.4219, 39.4189],
    '重庆': [107.7539, 30.1904],
    '黑龙江': [127.9688, 45.368],
    '吉林': [125.8154, 44.2584],
    '辽宁': [123.1238, 42.1216],
    '内蒙古': [111.4124, 40.4901],
    '河北': [114.4995, 38.1006],
    '新疆': [87.9236, 43.5883],
    '甘肃': [103.5901, 36.3043],
    '青海': [101.4038, 36.8207],
    '陕西': [109.1162, 34.2004],
    '宁夏': [106.3586, 38.1775],
    '河南': [113.4668, 34.6234],
    '山东': [117.1582, 36.8701],
    '山西': [112.3352, 37.9413],
    '安徽': [117.29, 32.0581],
    '湖北': [114.3896, 30.6628],
    '湖南': [113.0823, 28.2568],
    '江苏': [118.8062, 31.9208],
    '四川': [103.9526, 30.7617],
    '贵州': [106.6992, 26.7682],
    '云南': [102.9199, 25.4663],
    '广西': [108.479, 23.1152],
    '西藏': [91.1865, 30.1465],
    '浙江': [119.5313, 29.8773],
    '江西': [116.0046, 28.6633],
    '广东': [113.5107, 23.2196],
    '福建': [119.4543, 25.9222],
    '海南': [110.3893, 19.8516],
    '拉萨': [91.1865, 30.1465]
}


var toursData = [
    [{name:"拉萨"}, {name:"安徽", value:9}], 
    [{name:"拉萨"}, {name:"北京", value:43}], 
    [{name:"拉萨"}, {name:"重庆", value:17}], 
    [{name:"拉萨"}, {name:"福建", value:8}], 
    [{name:"拉萨"}, {name:"甘肃", value:18}], 
    [{name:"拉萨"}, {name:"广东", value:45}], 
    [{name:"拉萨"}, {name:"广西", value:23}], 
    [{name:"拉萨"}, {name:"贵州", value:15}], 
    [{name:"拉萨"}, {name:"海南", value:1}], 
    [{name:"拉萨"}, {name:"河北", value:15}], 
    [{name:"拉萨"}, {name:"河南", value:33}], 
    [{name:"拉萨"}, {name:"黑龙江", value:3}], 
    [{name:"拉萨"}, {name:"湖北", value:18}], 
    [{name:"拉萨"}, {name:"湖南", value:17}], 
    [{name:"拉萨"}, {name:"吉林", value:9}], 
    [{name:"拉萨"}, {name:"江苏", value:29}], 
    [{name:"拉萨"}, {name:"江西", value:7}], 
    [{name:"拉萨"}, {name:"辽宁", value:13}], 
    [{name:"拉萨"}, {name:"内蒙古", value:1}], 
    [{name:"拉萨"}, {name:"宁夏", value:4}], 
    [{name:"拉萨"}, {name:"山东", value:28}], 
    [{name:"拉萨"}, {name:"山西", value:14}], 
    [{name:"拉萨"}, {name:"陕西", value:23}], 
    [{name:"拉萨"}, {name:"上海", value:19}], 
    [{name:"拉萨"}, {name:"四川", value:54}], 
    [{name:"拉萨"}, {name:"天津", value:13}], 
    [{name:"拉萨"}, {name:"西藏", value:6}], 
    [{name:"拉萨"}, {name:"新疆", value:8}], 
    [{name:"拉萨"}, {name:"云南", value:18}], 
    [{name:"拉萨"}, {name:"浙江", value:23}], 
    [{name:"拉萨"}, {name:"青海", value:1}]
]

var tourPath = "path://M512 0l512 1024H0z";

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[1].name];
        var toCoord = geoCoordMap[dataItem[0].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[1].name,
                toName: dataItem[0].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};

var color = ['#ffa022', '#a6c84c', '#46bee9'];
var series = [
    {// 轨迹
        name: '藏地之旅',
        type: 'lines',
        zlevel: 3,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 2
        },
        lineStyle: {
            normal: {
                color: '#ffa022',
                width: 0,
                curveness: -0.35    // 轨迹的曲度
            }
        },
        data: convertData(toursData)
    },
    {// 移动点
        name: '藏地之旅',
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
            show: false,
            period: 6,
            trailLength: 0,
            symbol: tourPath,
            symbolSize: 12
        },
        lineStyle: {
            normal: {
                color: '#ffa022',
                width: 1,
                opacity: 0.6,
                curveness: -0.35    // 轨迹的曲度
            }
        },
        data: convertData(toursData)
    },
    {// 出发点
        name: '藏地之旅',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 1,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                position: 'top',
                formatter: '{b}'
            }
        },
        symbolSize: function (val) {
            return val[2] / 3;
        },
        itemStyle: {
            normal: {
                color: function(params) {
                    var val = params.data.value[2]
                    if (val < 30) {
                        return '#46bee9';
                    } else if (val > 50) {
                        return 'red'
                    } else
                        return '#a6c84c';
                }
            }
        },
        data: toursData.map(function (dataItem) {
            return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
        })
    }
];

tibetanOption = {
    // backgroundColor: '#404a59',
    title : {
        text: '近 5 年自驾进藏游客来源分布',
        subtext: '汽车之家论坛藏地之旅精选游记作者省份分布可视化展示',
        left: 'left'
    },
    tooltip : {
        trigger: 'item',
            formatter: function(params) {
                if (params.seriesIndex == 2) {
                    return params.name + '<br>' + '自驾进藏热度：' + params.data.value[2];
                } else if (params.seriesIndex == 1) {
                    return params.data.fromName + ' → ' + params.data.toName;
                }
            }
    },
    legend: {
        orient: 'vertical',
        top: '3%',
        left: 'center',
        data:['藏地之旅'],
        selectedMode: 'single'
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#404a59'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    toolbox: {
        show: true,
        feature: {
            restore: {},
            // dataView: {readOnly: false},
            saveAsImage: {}
        },
        right: '3%'
    },
    // calculable : true,
    series: series
};
tibetanChart.setOption(tibetanOption);