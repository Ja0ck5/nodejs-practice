const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

app.listen(3000);
console.log('app started at port 3000...');

