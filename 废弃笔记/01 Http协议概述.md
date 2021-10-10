## 一、http协议概述
http协议全称超文本传输协议，大家只要把它理解成为一个服务器与客户端通信的协议即可。

在http协议的约定下，客户端可以向服务器发送请求，服务器在接收到请求之后，给予客户端响应。

## 二、http协议请求的常用方法
本节我们讲解http协议常用的四种方法，用来完成数据的增、删、改、查操作。

* get方法：获取数据
* post方法：提交数据
* put方法：修改数据
* delete方法：删除数据
对于初学者，这里需要注意的是，http请求本身并不会完成增删改查的基本操作，真正的操作仍然是由服务器完成。

这些操作仅仅是一种约定，例如：我们用get请求配合服务器程序，可以获取数据，同样也可以添加、删除、修改数据，但是为了规范我们的程序，通常只用get方法来查询数据。

## 三、http协议状态码
http的状态码被分为5大类，状态码为客户端提供一种理解事务处理结果的便捷方式，我们在network工具中可以看到响应头中的的状态码。

* 100~199（信息性状态码）：HTTP/1.1向协议中引入了信息性状态码
* 200~299（成功状态码）：客户端发起请求时，这些请求通常都是成功的。服务器有一组用来表示成功的状态码，分别对应于不同类型的请求
* 300~399（重定向状态码）：重定向状态码要么告知客户端使用替代位置来访问他们所感兴趣的资源，要么就提供一个替代的响应而不是资源的内容
* 400~499（客户端状态码）：有时客户端会发送一些服务器无法处理的东西。浏览网页时，我们都看到过臭名昭著的404 Not Found错误码，这只是服务器在告诉我们，它对我们请求的资源一无所知
* 500~599（服务器状态码）：有时客户端发送了一条有效请求，服务器自身却出错了，这些会返回5xx状态码

_下面三个常用的HTTP状态码使我们必须要记住的_：
* **200 OK**：请求被正常处理
* **404 Not Found**：服务器找不到客户端请求的资源，也有可能是服务器不想让你访问而故意返回404
* **500 Internal Server Error**：服务器内部错误

## Postman 增删改查
数组的splice可以实现数组元素的添加、删除、和修改。用法如下：
```js
let dataList = ["香蕉","苹果","鸭梨"];
dataList.splice(0,1) //从索引为0的元素开始，删除1个元素，此案例会删除香蕉-删除功能。
dataList.splice(1,0,"草莓") //从索引为1的元素开始，删除0个元素，并在删除元素的位置插入"草莓"-添加功能。
dataList.splice(1,1,"草莓") //从索引为1的元素开始，删除1个元素，并在删除元素的位置插入"草莓"-修改功能。
```

server.js服务器编码：

```js
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
```