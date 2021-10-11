//1. 引入express
const express = require('express')

//2. 创建应用对象
const app = express()

//3. 创建路由规则
// request 是对请求报文的封装
// respones 是对响应报文的封装

// app.options("/json-server", (request, response) =>{
//   response.setHeader("Access-Control-Allow-Headers", "*")
//   response.setHeader("Access-Control-Allow-Origin", "*")
//   response.end()
// })

app.get('/server',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应
  response.send(
    `<h1>hi</h1>`
  )
})

// 可以接收任意类型的请求
app.all('/server',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应头
  response.setHeader('Access-Control-Allow-Headers','*')
  // 设置响应
  response.send(
    `<h1>hi,I'm from POST</h1>`
  )
})

// JSON 对象数据响应
app.all('/json-server',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应头
  response.setHeader('Access-Control-Allow-Headers','*')
  // 响应一个数据
  const data = {name:'atguigu'}
  // 对对象进行字符串转换：
  // let str = JSON.stringify(data)
  // 设置响应
  response.send(data)
})

// 针对IE缓存
app.get('/ie',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应
  response.send(
    `<h1>hi ie!????? -1</h1>`
  )
})

// 延时响应
app.get('/delay',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')

  setTimeout(()=>{
    // 设置响应
    response.send('延时响应')
  },3000)
})

//4.监听端口启动服务
app.listen(8000, ()=>{
  console.log("服务已启动，8000端口监听中。。。");
})