# AJAX课程

## 第一章 原生AJAX

### 一、AJAX简介

* AJAX全称 Asynchronous JavaScript and XML (异步JS和XML)
* 通过AJAX可以在浏览器中向服务器发送异步请求
* 最大的优势：无刷新获取数据

### 二、XML简介

* XML 可扩展标记语言。
* XML 被设计用来传输和存储数据。
* XML 和 HTML 相似，不同的是 HTML 中是预定义标签，而XML中没有预定义标签，全都是自定义标签，用来表示一些数据。
```xml
<fruit>
   <name>apple</name>
   <weight>0.5kg</weight>
   <color>red</color>
</fruit>
```
* XML 现在已经被json替代了：
```json
{
    "fruit":{
        "name":"apple",
        "weight":"0.5kg",
        "color":"red"
    }
}
```

### 三、AJAX的特点

* AJAX的优点
  1. 可以无需刷新页面与服务端进行通信
  2. 允许你根据用户事件(键盘、鼠标事件等)来更新部分页面内容
* AJAX的缺点
  1. 没有浏览历史，不能回退
  2. 存在跨域问题（同源）
  3. SEO不友好

### 四、HTTP协议

* HTTP(hypertext transport protocol)协议【超文本传输协议】，协议详细规定了【浏览器】与【万维网服务器】之间相互通信的规则。

#### 请求报文
* 重点是格式和参数
```
行    POST  /s?ie=utf-8  HTTP/1.1
头    Host: atguigu.com
      Cookie: name=guigu
      Content-type: application/x-www-form-urlencoded
      User-Agent: chrome 83
空行
体    (如果是GET请求，请求体为空；POST请求，请求体可不为空)
      username=admin&password=admin
```

#### 相应报文
```
行    HTTP/1.1 200 OK
头    Content-Type: text/html;charset=utf-8
      Content-length:2048
      Content-encoding:gzip
空行  
体    <html>
          <head>
          </head>
          <body>
              <h1>尚硅谷</h1>
          </body>
      </html>
```

## 第二章 Express
### 一、express
1. 在server.js中引入express
```js
const express = require('express')
```

2. 创建应用对象
```js
const app = express()
```

3. 创建路由规则
 * request 是对请求报文的封装
 * respones 是对响应报文的封装
```js
app.get('/',(request, response)=>{
   设置响应
  response.send('Hello Express!')
})
```

4. 监听端口启动服务
```js
app.listen(8000, ()=>{
  console.log("服务已启动，8000端口监听中...");
})
```

## 第三章 原生AJAX

### 一、AJAX GET请求的基本操作

1. 创建 GET.html 和 server.js 文件
2. 在server.js 中设置响应头和响应内容
```js
app.get('/server',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应
  response.send('Hello!')
})
```
3. GET.html中获取按钮节点，点击按钮触发事件，向服务器发送请求，获取数据
```js
  //获取button元素
  const btn = document.getElementsByTagName('button')[0]
  const result = document.getElementById('result')
  //绑定事件
  btn.onclick = function () {
    // 1.创建对象
    const xhr = new XMLHttpRequest()
    // 2.初始化 设置请求方法和url
    xhr.open('GET', 'http://127.0.0.1:8000/server')
    // 3.发送
    xhr.send()
    // 4.事件绑定 处理服务端返回的结果
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          result.innerHTML = xhr.response // 设置result的文本
        } else {
    }}}
```

* readystate 是 xhr 对象中的属性，表示状态五个阶段：
  - 0 初始值 
  - 1 open方法调用完毕
  - 2 send方法调用完毕
  - 3 服务端返回部份结果
  - 4 服务端返回所有结果

* xhr 对象的其它属性：（行、头、空行、体）
  xhr.status => 状态码（200 404 403 401 500）
  xhr.statusText => 状态字符串
  xhr.getAllResponseHeaders() => 所有响应头
  xhr.response => 响应体

4. AJAX GET请求里设置参数的方式：
  在url地址后用 ？ 开头，& 分隔多个参数

```js
xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300')
```
发送请求后可在network中的Query String Parameters看到发送的参数详情。

### 二、AJAX POST请求的基本操作

1. AJAX里的post请求：
```js
xhr.open('POST','http://127.0.0.1:8000/server')
```

2. server.js 中：
```js
app.post('/server',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应
  response.send(
    `<h1>hi,I'm from POST</h1>`
  )
})
```

3. post请求该如何设置参数
```js
xhr.send('a=100&b=200&c=300')
// xhr.send('a:100&b:200&c:300')
// xhr.send('hello')
```

### 三、设置请求头信息
在xhr.send()之前，使用setRequestHeader方法：
```js
 //设置请求头
  xhr.setRequestHeader("","")

设置请求体内容（send内参数）的类型：
('Content-Type','applicaton/x-www-form-urlencoded')
设置名字
('name','atguigu')
```

遇到报错，是浏览器的安全机制，防止post发送任意类型的请求,解决方法是在server.js中：
```js
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
```

### 四、传递对象数据
1. server.js中：
```js
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
```

2. html文件中对接收到的data（字符串格式）进行转换：
手动转换：
```js
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status >= 200 && xhr.status <300){
        // 手动转换：
        let data = JSON.parse(xhr.response)
        console.log(data); // 对象
        result.innerHTML = data.name
      }}}
```
自动转换：
```js
// 设置响应体数据的类型:
      xhr.responseType = 'json'
...
xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
          if(xhr.status >= 200 && xhr.status <300){
            // 自动转换
            console.log(xhr.response); // 对象
            result.innerHTML = xhr.response.name
          }}}
```

### 五、解决IE浏览器的缓存问题：
在初始化请求方法和url中：
```js
  xhr.open("GET",'http://127.0.0.1:8000/ie?t='+Date.now())

```
url加上了 ?t= , 再加Date.now()

### 六、请求超时与网络异常
* 请求超时
1.在server中设置延时：
```js
app.get('/delay',(request, response)=>{
  // 设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')

  setTimeout(()=>{
    // 设置响应
    response.send('延时响应')
  },3000)
})
```

2.在html中设置2秒的超时：
```js
 const xhr = new XMLHttpRequest()  
      // 超时自动取消 2s 设置
      xhr.timeout = 2000
      // 超时回调
      xhr.ontimeout = function(){
        result.innerHTML = '网络异常，请稍后重试'
        // alert('网络异常，请稍后重试')
      }
```

* 网络异常回调：
```js
xhr.onerror = function(){
        result.innerHTML = '对不起，您的网络异常，请检查网络'
      }
```

### 七、手动取消
.abort() 方法

html（注意x需要在函数外部先赋一个空值）:
```js
 const btns = document.querySelectorAll('button')

    let x = null

    btns[0].onclick = function(){
      x = new XMLHttpRequest()
      x.open('GET','http://127.0.0.1:8000/delay')
      x.send()
    }

    btns[1].onclick = function(){
      x.abort()
    }
```

### 八、重复请求问题
建立一个标识变量 isSending
```js
const btns = document.querySelectorAll('button')
    let x = null

    // 标识变量
    let isSending = false; // 是否正在发送AJAX请求

    btns[0].onclick = function(){
      
      if(isSending) x.abort() 
      // ↑ 如果正在发送，则取消该请求，创建一个新的请求

      x = new XMLHttpRequest()
      isSending = true // 修改标识变量的值
      x.open('GET','http://127.0.0.1:8000/delay')
      x.send()
      x.onreadystatechange = function(){
        if(x.readyState === 4){
          isSending = false // 修改标识变量的值
        }
      }
    }
```