const Koa = require("koa")
const router = require("koa-router")()
const parser = require("koa-parser")
const app = new Koa()
app.use(parser())
app.use(router.routes())



// 数据
let dataList = ["香蕉","苹果","鸭梨"]

// get查看(获取)
router.get("/fruits", ctx => {
    ctx.body = dataList //直接返回数组
})

// post添加
router.post("/fruits", ctx => {
    let fruit = ctx.request.body.fruit
    dataList.push(fruit)  // .push()方法可以在数组结尾追加数据
    ctx.body = dataList  // 数据是存储在服务器的内存里，重启服务器则清空
})

//put修改
router.put("/fruits/:id", ctx => {
    // 路由传参  /:id   --> ctx.params.id 可以获取id

    let id = ctx.params.id
    let fruit = ctx.request.body.fruit
    dataList.splice(id,1,fruit)
    // splice(startIndex, deleteCount, replaceItem)

    ctx.body = dataList
})

//delete删除
router.delete("/fruits/:id", ctx => {
    let id = ctx.params.id
    dataList.splice(id,1)
    ctx.body = dataList
})


app.listen(3000,() => {
    console.log("My server for Ajax is running!");
})

