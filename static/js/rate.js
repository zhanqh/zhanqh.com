var rateChart = echarts.init(document.getElementById('rate'));
rateOption = {
    title: {
        text: '全国各省份日系德系购买比例',
        link: 'http://qhzhan.com/data/jcar-gcar.html',
        target: 'self',
        subtext: '日系购买热度/德系购买热度，数据来源汽车之家车主价格频道',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} <br/>{a} : {c}%"
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        top: 'bottom',
        data:['日系/德系']
    },
    visualMap: {
        min: 50,
        max: 300,
        left: 'left',
        top: 'bottom',
        text: ['高（%）','低（%）'],           // 文本，默认为数值文本
        calculable: true
    },
    toolbox: {
        show: true,
        // orient: 'vertical',
        right: '2%',
        top: 'top',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '日系/德系',
            type: 'map',
            mapType: 'china',
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {'name': '四川', 'value': 91.40},
                {'name': '北京', 'value': 77.94},
                {'name': '河北', 'value': 64.37},
                {'name': '江苏', 'value': 80.33},
                {'name': '河南', 'value': 87.51},
                {'name': '湖北', 'value': 131.49},
                {'name': '黑龙江', 'value': 111.65},
                {'name': '浙江', 'value': 83.95},
                {'name': '上海', 'value': 84.41},
                {'name': '重庆', 'value': 121.19},
                {'name': '安徽', 'value': 62.46},
                {'name': '辽宁', 'value': 150.02},
                {'name': '吉林', 'value': 108.96},
                {'name': '贵州', 'value': 53.67},
                {'name': '广西', 'value': 205.95},
                {'name': '甘肃', 'value': 161.34},
                {'name': '福建', 'value': 115.73},
                {'name': '云南', 'value': 76.15},
                {'name': '山东', 'value': 66.42},
                {'name': '江西', 'value': 82.19},
                {'name': '山西', 'value': 66.38},
                {'name': '湖南', 'value': 150.19},
                {'name': '广东', 'value': 224.88},
                {'name': '陕西', 'value': 107.56},
                {'name': '新疆', 'value': 240.11},
                {'name': '天津', 'value': 152.31},
                {'name': '内蒙古', 'value': 93.47},
                {'name': '海南', 'value': 223.97},
                {'name': '青海', 'value': 282.49},
                {'name': '宁夏', 'value': 152.54},
                {'name': '西藏', 'value': null, tooltip: {trigger: 'item', formatter: "{b} <br/>没有数据"}},
                {'name': '香港', 'value': null, tooltip: {trigger: 'item', formatter: "{b} <br/>没有数据"}},
                {'name': '澳门', 'value': null, tooltip: {trigger: 'item', formatter: "{b} <br/>没有数据"}},
                {'name': '台湾', 'value': null, tooltip: {trigger: 'item', formatter: "{b} <br/>没有数据"}}
            ]
        }
    ]
};
rateChart.setOption(rateOption);