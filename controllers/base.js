/* 部分代码，不含密钥等信息 */



function createBase (data) {
    // 获取时间戳
    var date = new Date();
    var unixTime = date.getTime();
    // gps时间 = 时间戳随机减少 1-30 毫秒
    var gpsTime = String(unixTime - Math.floor(Math.random() * 30 + 1));
    // 时间戳转文本
    var timestamp = String(unixTime);
    // 请求参数reqpara
    var reqpara = {
        devtype: 1,
        speed: "0.0",
        direc: "0.0",
        versiontype: 4,
        uid: userId,
        reserved: "iOS",
        gpstime: gpsTime,
        devno: devno,
        version: "3.0.1",
        lng: 0,
        lat: 0
    }
    // 签名种子
    var seedMsg = REQ_KEY + "appid" + appid + "data" + JSON.stringify(data) + "reqpara" + JSON.stringify(reqpara) + "timestamp" + timestamp + REQ_KEY;
    var sign = hex_sha1(seedMsg).toUpperCase();
    var params = {
        sign: sign,
        appid: appid,
        timestamp: timestamp,
        data: JSON.stringify(data),
        reqpara: JSON.stringify(reqpara)
    }
    return params;
}



exports.createBase = createBase