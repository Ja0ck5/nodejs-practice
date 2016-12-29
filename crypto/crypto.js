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

// Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：
//只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Ja0ck5!');
hmac.update(new Buffer('JA0CK5!'));
// a614f8081ede61ee7d8792cf8590d9614b45e1e3e8b0ea1cbb6d614671f50042
console.log(hmac.digest('hex')); 

//AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'some secret messages!';
var key = 'Password';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);
//=========================================================================//
// Plain text: some secret messages!
// Encrypted text: a07940fd0ba884e5bc1db6a963cf3567383aaa43418fd105220df38981149573
// Decrypted text: some secret messages!
console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);
//=========================================================================//




//DHDiffie-Hellman
// DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
/**
 * Prime: f52a403dcbafad561c9124546bb285630b80925aaa05aab2929215810f87328a9ee4920f454e3f469466a9522a060e3069d1f23ef7e407a085842530630e1293
    Generator: 02
    Secret of Xiao Ming: 00769379cbed33abb84b07eafb12b869ca3c13293a8ae62e3bbef9d86fc8d8c166b464cc8cedd8e2e0128ae0174fa08ee5f7557794a4370405c360d90c3b5a1d
    Secret of Xiao Hong: 00769379cbed33abb84b07eafb12b869ca3c13293a8ae62e3bbef9d86fc8d8c166b464cc8cedd8e2e0128ae0174fa08ee5f7557794a4370405c360d90c3b5a1d
 */
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));