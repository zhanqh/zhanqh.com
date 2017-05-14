var tibetanCarChart = echarts.init(document.getElementById('tibetan-car'));
var tibetanCarOption = {
    // backgroundColor: '#404a59',//'#2c343c',
    // visualMap: {
    //     show: false,
    //     min: 80,
    //     max: 600,
    //     inRange: {
    //         colorLightness: [0, 1]
    //     }
    // },
    title : {
        text: '自驾进藏车型分布',
        subtext: '汽车之家论坛藏地之旅精选游记自驾车型前15名统计',
        left: 'left',
        // textStyle : {
        //     color: '#fff'
        // }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {d}%"
    },
    toolbox: {
        show: true,
        feature: {
            restore: {},
            dataView: {readOnly: false},
            saveAsImage: {}
        }
    },
    // calculable : true,
    series : [
        {
            name: '自驾车型',
            type: 'pie',
            radius: '65%',
            data:[
                {value: 21, name:'RAV4荣放'},
                {value: 13, name: '森林人'},
                {value: 11, name: '奇骏'},
                {value: 11, name: '本田CR-V'},
                {value: 8, name: '奔腾X80'},
                {value: 8, name: '逍客'},
                {value: 8, name: '翼虎'},
                {value: 8, name: '五菱宏光'},
                {value: 8, name: '途观/途观L'},
                {value: 7, name: '昂科雷'},
                {value: 6, name: '普拉多'},
                {value: 6, name: '汉兰达'},
                {value: 6, name: '发现'},
                {value: 6, name: '全新胜达'},
                {value: 6, name: '自由客'}
            ],
            roseType: 'angle',
            // label: {
            //     normal: {
            //         textStyle: {
            //             color: 'rgba(255, 255, 255, 0.3)'
            //         }
            //     }
            // },
            // labelLine: {
            //     normal: {
            //         lineStyle: {
            //             color: 'rgba(255, 255, 255, 0.3)'
            //         }
            //     }
            // },
            // itemStyle: {
            //     normal: {
            //         // color: '#c23531',
            //         shadowBlur: 200,
            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
            //     }
            // }
        }
    ]
};

tibetanCarChart.setOption(tibetanCarOption);