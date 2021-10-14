const Koa = require("koa")
const router = require("koa-router")()
const views = require("koa-views")
const nunjucks = require("nunjucks")
const app = new Koa()

app.use(views(__dirname + "/views", {
    map: { html: "nunjucks" }
}))


router.get("/", async ctx => {
    await ctx.render("index")
})

router.get("/data", async ctx => {
    ctx.body = "hello world!"
})


app.use(router.routes())

app.listen('3000',() => {
    console.log("Here we go baby!");
})