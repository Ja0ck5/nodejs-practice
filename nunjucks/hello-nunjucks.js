const nunjucks = require('nunjucks');
function createEnv(path, opts) {
    var
        //用autoescape = opts.autoescape && true这样的代码给每个参数加上默认值
        autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        //变量env就表示Nunjucks模板引擎对象，它有一个render(view, model)方法，正好传入view和model两个参数，并返回字符串。
        env = new nunjucks.Environment(
            //创建一个文件系统加载器，从views目录读取模板。
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});


var s = env.render('index.html', { name: '<script>alert("小明")</script>' });
console.log(s);