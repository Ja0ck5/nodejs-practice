// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// // 创建一个Koa对象表示web app本身:
// const app = new Koa();

// // 对于任何请求，app将调用该异步函数处理请求：
// console.log('app started at port 80...');

// app.use(async (ctx,next)=>{
//     await next();
//     ctx.response.type='text/html';
//     ctx.response.body = '<h1>Hello Koa2</h1>';
// }).listen(80);

// app.use(async (ctx, next) => {
//     console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
//     await next(); // 调用下一个middleware
// });

// app.use(async (ctx, next) => {
//     const start = new Date().getTime(); // 当前时间
//     await next(); // 调用下一个middleware
//     const ms = new Date().getTime() - start; // 耗费时间
//     console.log(`Time: ${ms}ms`); // 打印耗费时间
// });

// app.use(async (ctx, next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// });


// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');