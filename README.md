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
