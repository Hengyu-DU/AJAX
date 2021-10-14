//1. 引入express
const { response, request } = require('express')
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
app.all('/delay',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers','*')

  setTimeout(()=>{
    // 设置响应
    response.send('延时响应')
  },3000)
})

// jQuery 服务
app.all('/jquery-server',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers','*')

  // response.send('Hello jQuery AJAX')
  const data = {name:'尚硅谷'}
  // response.send(data)
  response.send(JSON.stringify(data))
})

// axios 服务
app.all('/axios-server',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers','*')

  // response.send('Hello jQuery AJAX')
  const data = {name:'尚硅谷'}
  // response.send(data)
  response.send(JSON.stringify(data))
})

// fetch 服务
app.all('/fetch-server',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers','*')

  // response.send('Hello jQuery AJAX')
  const data = {name:'尚硅谷'}
  // response.send(data)
  response.send(JSON.stringify(data))
})

// JSONP 服务
app.all('/jsonp-server',(request,response)=>{
  // response.send('hi jsonp-server')
  // response.send("console.log('hello jsonp')")
  const data = {
    name : 'atguigu'
  }
  let str = JSON.stringify(data)
  response.end(`handle(${str})`)
})

// JSONP 实践：检测用户名是否存在
app.all('/check-username',(request,response)=>{
  const data = {
    exist : 1,
    msg:'用户名已经存在'
  }
  let str = JSON.stringify(data)
  response.end(`handle(${str})`)
})

// jQuery-JSONP 实践：检测用户名是否存在
app.all('/jquery-jsonp-server',(request,response)=>{
  const data = {
    name:'尚硅谷',
    city:['北京','上海','深圳']
  }
  let str = JSON.stringify(data)
  // 接收callback 参数
  let cb = request.query.callback
  response.end(`${cb}(${str})`)
})

app.all('/cors-server',(request,response)=>{
  response.setHeader("Access-Control-Allow-Origin","*")
  response.setHeader("Access-Control-Allow-Hearders","*")
  response.setHeader("Access-Control-Allow-Method","*")
  response.send('Hello CORS')
})

//4.监听端口启动服务
app.listen(8000, ()=>{
  console.log("服务已启动，8000端口监听中。。。");
})