// 基于准备好的dom，初始化echarts实例
var usedCarChart = echarts.init(document.getElementById('used-car'));

var list_year = ['1年','2年','3年','4年','5年', '6年','7年','8年']
var suv_h6 = [84.38, 72.66, 64.16, 58.91, 51.94, 49.73]
var suv_rav4 = [84.64, 75.05, 70.29, 64.14, 55.24, 51.01, 45.04, 41.12]
var suv_xtrail = [86.76, 80.90, 72.69, 63.87, 48.49, 46.32, 41.97, 38.20]
var suv_crv = [87.40, 81.03, 71.14, 65.08, 61.08, 53.62, 46.09, 41.84]
var suv_tiguan = [85.67, 76.39, 67.62, 62.78, 55.61, 52.34, 48.64, 48.09]
var b_camry = [85.21, 74.67, 67.86, 63.77, 59.47, 52.75, 45.31, 39.99]
var b_teana = [86.82, 74.13, 68.70, 64.13, 52.25, 46.17, 42.09, 37.09]
var b_bmw3 = [81.10, 70.87, 62.77, 58.56, 53.65, 40.15, 36.85, 32.66]
var b_accord = [87.58, 75.18, 68.43, 63.08, 55.63, 49.52, 44.67, 40.60]
var b_magotan = [84.41, 72.91, 66.00, 60.84, 56.42, 52.31, 37.71, 33.59]
var a_lavida = [84.06, 77.50, 68.37, 60.65, 55.89, 47.18, 43.41, 41.32]
var a_sylphy = [88.77, 77.39, 69.43, 62.04, 58.44, 49.48, 41.72, 38.20]
var a_excelle = [87.85, 70.18, 54.56, 49.46, 45.87, 41.76, 37.64, 36.10]
var a_corolla = [84.28, 78.77, 72.53, 58.41, 52.25, 48.57, 45.34, 38.13]
var a_civic = [86.77, 75.10, 66.18, 59.56, 55.36, 49.35, 41.89, 38.31]
// 指定图表的配置项和数据
usedCarOption = {
    baseOption: {
        timeline: {
            axisType: 'category',
            autoPlay: true,
            playInterval: 1500,
            data: [
                'A级轿车','B级轿车','紧凑级SUV',
            ],
            label: {
                formatter : function(s) {
                    return s;
                }
            }
        },
        title: {
            subtext: ' --热门汽车保值率对比，数据来源二手车之家'
        },
        tooltip: {},
        toolbox : {
            'show':true,
            orient : 'vertical',
            right: '2%',
            top: 'center',
            'feature':{
                'restore':{'show':true},
                'dataView': {},
                'saveAsImage':{'show':true}
            }
        },
        calculable : true,
        grid: {
            top: 80,
            bottom: 85
        },
        xAxis: [
            {
                'type':'category',
                'axisLabel':{'interval':0},
                'data':list_year,
                splitLine: {show: false}
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '保值率（%）'
            }
        ]
    },
    options: [
        {
            title: {
                text: '热门A级轿车保值率',
                link: 'http://qhzhan.com/data/used-car.html',
                target: 'self'
            },
            series: [
                {name: '思域', data: a_civic, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '卡罗拉', data: a_corolla, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '朗逸', data: a_lavida, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '轩逸', data: a_sylphy, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '英朗', data: a_excelle, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
            ],
            legend: {
                x: 'right',
                data: ['思域','卡罗拉', '朗逸', '轩逸', '英朗'],
                selected: {
                    '思域': true
                },
                top: 40
            }
        },
        {
            title : {
                text: '热门B级轿车保值率',
                link: 'http://qhzhan.com/data/used-car.html',
                target: 'self'
            },
            series : [
                {name: '迈腾', data: b_magotan, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '雅阁', data: b_accord, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '天籁', data:  b_teana, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '凯美瑞', data:  b_camry, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '宝马3系', data: b_bmw3, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
            ],
            legend: {
                x: 'right',
                data: ['迈腾','雅阁', '天籁', '凯美瑞', '宝马3系'],
                selected: {
                    ' 迈腾': true
                },
                top: 40
            }
        },
        {
            title : {
                text: '热门紧凑级SUV保值率',
                link: 'http://qhzhan.com/data/used-car.html',
                target: 'self'
            },
            series : [
                {name: '途观', data: suv_tiguan, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: 'CR-V', data: suv_crv, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '奇骏', data:  suv_xtrail, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: 'RAV4', data: suv_rav4, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
                {name: '哈弗H6', data: suv_h6, type: 'bar', tooltip: {trigger: 'item',formatter: "{a} <br/>{b}：{c}%"}},
            ],
            legend: {
                x: 'right',
                data: ['途观','CR-V', '奇骏', 'RAV4', '哈弗H6'],
                selected: {
                    '途观': true
                },
                top: 40
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
usedCarChart.setOption(usedCarOption);