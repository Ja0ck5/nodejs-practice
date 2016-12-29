console.log('haha','haha');
/**
 * crypto模块的目的是为了提供通用的加密和哈希算法。
 * 
 * 用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。
 * 
 * Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
 */

//MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：
const crypto = require('crypto');
const hash = crypto.createHash('md5');
//  const hash = crypto.createHash('sha1');
// 可任意多次调用update():update()方法默认字符串编码为UTF-8，也可以传入Buffer。
hash.update('Ja0ck5!');
hash.update(new Buffer('JA0CK5!'));
//md5 de204a26071426acdf12de4e973e82fe
//sha1 a23b4b38546f4eea7675a30f9b821cfde4131c65
console.log(hash.digest('hex'));