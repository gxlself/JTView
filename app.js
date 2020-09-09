const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
// const Router = require('koa-router')
// const router = new Router()
// const render = require('koa-ejs')
const path = require('path')
const serve = require('koa-static')
app.use(bodyParser())

app.use(async (ctx, next) => {
  // 允许来自所有域名请求
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Max-Age', 300)
  ctx.set('Access-Control-Expose-Headers', 'myData')

  await next()
})

/** 静态资源（服务端） */
const home = serve(path.join(__dirname) + '/public/')
app.use(home)

// 初始化ejs，设置后缀为html，文件目录为`views`
// render(app, {
//   root: path.join(__dirname, 'views'),
//   layout: false,
//   viewExt: 'html',
//   cache: false,
//   debug: false
// })
// 监听3000端口
app.listen(3000)
