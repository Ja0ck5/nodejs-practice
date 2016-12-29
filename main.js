'use strict';

// 引入hello模块:
var greet = require('./hello');

var s = 'World';
//执行模块里的函数
// greet(s);


var fs = require('fs');

// read txt
// fs.readFile('sample.txt', 'utf-8', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

//read png
// fs.readFile('banner.jpg', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//         console.log(data.length + ' bytes');

//         // Buffer -> String
//         var text = data.toString('utf-8');
//         console.log("\r\n==========================================================================="
//                     +text
//                     +"\r\n===========================================================================");
        
//         //或者把一个String转换成Buffer：
//         // String -> Buffer
//         var buf = new Buffer(text, 'utf-8');
//         console.log(buf);
//     }
// });


// var data = 'Hello, Node.js';
// fs.writeFile('output.txt', data, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('ok.');
//     }
// });


// file status or informations
// fs.stat('sample.txt', function (err, stat) {
//     if (err) {
//         console.log(err);
//     } else {
//         // 是否是文件:
//         console.log('isFile: ' + stat.isFile());
//         // 是否是目录:
//         console.log('isDirectory: ' + stat.isDirectory());
//         if (stat.isFile()) {
//             // 文件大小:
//             console.log('size: ' + stat.size);
//             // 创建时间, Date对象:
//             console.log('birth time: ' + stat.birthtime);
//             // 修改时间, Date对象:
//             console.log('modified time: ' + stat.mtime);
//         }
//     }
// });

/**由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。 */



// 要注意，data事件可能会有多次，每次传递的chunk是流的一部分数据。
// 要以流的形式写入文件，只需要不断调用write()方法，最后以end()结束：
// 打开一个流:
var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});

