let http = require("http");
let url = require("url");
let querystring = require("querystring");
let server = http.createServer();
server.on("request", function (req, res) { // 处理请求的方式
    let urlPath = url.parse(req.url).pathname;
    let qs = querystring.parse(req.url.split("?")[1]);// 获取到？后面部分，也就是callback=monkey，体现的格式为{ callback: 'monkey' }
    if (urlPath === '/jsonp' && qs.callback) {
        // 响应头信息
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        // 数据
        let data = {"name": "data values",};
        // 数据JSON化
        data = JSON.stringify(data);
        // 从 http://localhost:8080/jsonp?callback=monkey 获取到 qs.callback=monkey
        console.log(qs.callback);
        // 定义一个callback 字符串变量，callback = monkey({"name":"data values"})
        let callback = qs.callback + "(" + data + ");";
        // 返回callback，客户端由 function monkey(data){这里处理数据}  接收
        console.log(callback);
        console.log(typeof callback);
        res.end(callback);
    } else {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end('Hell World\n');
    }
});
server.listen(8080);
console.log("server is running...");
