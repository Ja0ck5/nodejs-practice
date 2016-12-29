'use strict';

// 导入http模块:
var http = require('http');
//创建 server 服务器
var server = http.createServer(function(request,response){
    //回调函数接收 request，response 对象
    // 获得 http 请求的 method 和 url
    console.log(request.method+': ' + request.url);
    // 将 http 响应码 和响应头信息 写入 response
    response.writeHead(200,{'Content-Type':'text/html'});
    //将 http 响应内容写入到 response
    response.end('<h1>Hello Node  Http</h1>');
}).listen(80);//服务器监听 80 端口

console.log('Server is running at:');

