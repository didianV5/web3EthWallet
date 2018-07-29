const Koa = require('koa');
const routers = require('./routers/index')
const koaBody = require('koa-body');
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')

const app = new Koa();

// 引入 koa-body 中间件
app.use(koaBody({
  multipart: true
}));

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    map : {html:'ejs'}
  }))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))


// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
app.listen(3000);
console.log('server is starting at port 3000')