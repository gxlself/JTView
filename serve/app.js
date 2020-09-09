const Koa = require('koa')
const staticServer = require('koa-static')
// const route = require('koa-router')
const path = require('path')

const app = new Koa()
const port = 10818

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin) // 很奇怪的是，使用 * 会出现一些其他问题
  ctx.set('Access-Control-Allow-Headers', 'content-type')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
  console.log(`${ctx.method} ${ctx.url}`)
  await next()
})

const home = staticServer(path.join(__dirname) + '/obj/')
app.use(home)

app.listen(port)
