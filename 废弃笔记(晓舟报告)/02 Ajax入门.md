### 一、Ajax概述
在我们之前学习的内容中，向服务器发送请求后，再浏览器中响应的页面都是整页刷新。

在某些项目中，我们只希望获取页面的局部数据，而不必整页刷新，这个时候就需要使用Ajax来实现功能了。

Ajax 的全称是Asynchronous JavaScript and XML（异步的JavaScript 和 XML）。这个概念出现的比较早，那个时候前端和后台的数据交互主要以XML格式为主，例如下面的数据格式：

```xml
<fruit>
   <name>apple</name>
   <weight>0.5kg</weight>
   <color>red</color>
</fruit>
```

现在仍然存在很多用xml交互数据的情况，但是目前主流的数据格式使用的是json（JavaScript对象表示法），例如下面的格式：

```js
{
    "fruit":{
        "name":"apple",
        "weight":"0.5kg",
        "color":"red"
    }
}
```

对于熟悉js的开发人员，这样的格式再熟悉不过了，基本是零学习成本，以后我们使用Ajax传递数据都是使用json格式。

**ajax的优缺点:**
* 优点：按需获取数据，提升系统性能。
* 缺点：异步获取数据，不利于搜索引擎优化。