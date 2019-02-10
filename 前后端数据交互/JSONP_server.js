let http = require("http");
let url = require("url");
let querystring = require("querystring");

let server = http.createServer();

server.on("request", function (req, res) {
    let urlPath = url.parse(req.url).pathname;//url 路径
    let qs = querystring.parse(req.url.split("?")[1]);

    if (urlPath === "/jsonp" && qs.callback) {
        res.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
        let data = {"name": "zgq"};
        data = JSON.stringify(data);
        let callback = qs.callback + "(" + data + ")";
        res.end(callback);
    } else {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end('Hell World\n');
    }
});
server.listen(8080);
console.log("server is running...");