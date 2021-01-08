# day57

## 模块化

### 什么是模块化

> **模块化**是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程
>
>  对于整个系统来说，模块是可组合、分解和更换的单元

### 编程中的模块化

> 编程领域中的模块化，就是**遵守固定的规则**，把一个大文件拆成独立并互相依赖的多个小模块

#### 代码进行模块化拆分的好处

- 提高了代码的复用性
- 提高了代码的可维护性
- 可以实现按需加载

### 模块化规范

> **模块化规范**就是对代码进行模块化的拆分与组合时，需要遵守的那些规则

- 使用什么样的语法格式来引用模块  （require('fs')）
- 在模块中使用什么样的语法格式向外暴露成员

> **模块化规范的好处**：都遵守同样的模块化规范写代码，降低了沟通的成本，极大方便了各个模块之间的相互调用， 利人利己

### Node.js 中模块的分类

> Node.js 中根据模块来源的不同，将模块分为了 3 大类

- 内置模块(内置模块是由 Node.js 官方提供的，例如 fs、path、http 等)
- 自定义模块(用户创建的每个 `.js` 文件，都是自定义模块)
- 第三方模块(由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载)

#### 加载模块

```js
// 加载核心模块
const fs = require('fs【模块名】');

// 加载第三方模块
const express = require('express【模块名】');

// 加载自定义模块
const custom = require('./custom【路径+名】');
```

使用 `require()` 加载模块后，会缓存起来，下次再调用 `require()`加载相同模块的时候，直接使用缓存，而不是从新加载，从而大大提高了性能。

**注意事项**：

- 无论是什么模块，我们都要使用 `require()` 去加载，然后才能使用。
- 加载自定义的模块，需要加 `./` ，而且可以省略后缀 `.js`

### Node.js中的模块作用域

> 在 Node.js 中，用户创建的每个 `.js` 文件都是自定义模块
>
> 在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做**模块作用域**
>
> 模块作用域的好处是避免了全局变量污染
>
> 由于模块具有一个模块级别的作用域，则另一个JS文件就无法使用当前模块定义的内容

### 导出导入模块

为了能正常使用加载的模块中的成员，CommonJS给出了标准，即

- 一个模块需要使用 `module.exports` 导出需要共享的内容
- 使用模块的JS文件需要使用 `require()` 导入模块

> 模块导出的是什么，另一个使用模块的JS文件得到的就是什么

### CommonJS规范

模块化规范的种类：

- AMD
- CMD
- CommonJS ---  Node.js 遵循CommonJS
- ES6 --- (import&export)

Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。

CommonJS 规定:

1. 每个模块内部，module 变量代表当前模块。
2. module 变量是一个对象，它的 exports 属性(即 module.exports)是对外的接口。
3. 加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。

### 加载自定义模块

1. 首次加载成功，会缓存模块
2. 下次从缓存中加载，速度更快
3. 加载自定义模块必须加 `./` 【同级目录】，如果是其他路径，对应变化`pathname`，否则会把它当做核心模块或者第三方模块
4. 加载自定义模块的时候，如果是 `require('./abc')`
   1. 优先加载相同名字的文件，加载一个叫做 abc 的文件
   2. 自动补 `.js` 后缀，然后加载 `abc.js` 文件
   3. 自动补 `.json` 后缀，然后加载 `abc.json` 文件
   4. 自动补 `.node` 后缀，然后加载 `abc.node` 文件
   5. 以上文件都没有，则报错 `Cannot find module './abc'`

### 加载核心模块和第三方模块

1. 首次加载成功，会缓存模块
2. 下次从缓存中加载，速度更快
3. 加载模块一定`不能`加 `./` ，否则会把它当做自定义模块
4. 加载模块的时候，如果是 `require('haha')`
   1. 优先加载核心模块
   2. 去查找并加载第三方模块，查找第三方模块的路径可以通过 `module.paths` 查看
   3. 加载第三方模块会从当前目录开始寻找node_modules文件夹， 如果找到进入node_modules文件夹寻找对应的模块。如果没找到，进入上一级目录继续寻找node_modules，一直到根目录。如果一直没有找到，提示未找到模块

## Express

### express 介绍

- Express 是一个第三方模块，用于快速搭建服务器
- Express 是一个基于 Node.js 平台，快速、开放、极简的 **web 开发框架**。
- express保留了http模块的基本API，使用express的时候，也能使用http的API
- express还额外封装了一些新方法，能让我们更方便的搭建服务器
- [Express 官网](http://expressjs.com/)
- [Express 中文文档（非官方）](http://www.expressjs.com.cn/)
- [Express GitHub仓库](https://github.com/expressjs/express)

### 使用Express构造Web服务器

使用Express构建Web服务器步骤：

  1) 加载 express 模块

  2) 创建 express 服务器

  3) 开启服务器

  4) 监听浏览器请求并进行处理

```js
// 使用express 搭建web服务器
// 1) 加载 express 模块
const express = require('express');

// 2) 创建 express 服务器
const app = express();

// 3) 开启服务器
app.listen(3006, () => console.log('express服务器开始工作了'));

// 4) 监听浏览器请求并进行处理

app.get('GET请求的地址', 处理函数);

app.post('POST请求的地址', 处理函数);
```

### express封装的新方法

express之所以能够实现web服务器的搭建，是因为其内部对核心模块http进行了封装。

封装之后，express提供了非常方便好用的方法。

- express
  - express.static() -- 开放静态资源
  - express.urlencoded()  -- 获取POST请求体
  - 其他...
- app
  - `app.get()`  --  处理客户端的GET请求
  - `app.post()` -- 处理客户端的POST请求
  - app.use() -- 设置应用级别的配置
  - 其他...

- req
  - req.body -- 获取POST请求体
  - req.params -- 获取GET请求动态参数
  - req.query -- 获取GET请求参数(获取查询字符串参数)
  - 其他...
- res
  - `res.sendFile(文件的绝对路径)` -- 读取文件，并将结果响应
  - `res.set({name, value})` -- 设置响应头
  - `res.status(200)` -- 设置响应状态码
  - `res.send(字符串或对象)` -- 响应结果
  - `res.json(对象)` -- 以JSON格式响应结果
  - res.jsonp() -- 以JSONP格式响应结果
  - 其他...

> 在express中，仍然可以使用http模块中的方法

```js
const express = require('express')
const app = express()
app.listen(3006【端口号】, () => console.log('启动了'))
app.get('/test', (req, res) => {
    // express提供的新方法:res.send() -- 做出响应，参数是响应体
    // res.send('hello，我是服务器') // 会自动设置响应头
    // res.end(["aaa", "bbb", "ccc"]) // 报错，end方法，只能填字符串参数
    // res.send(["aaa", "bbb", "ccc"]) // 对于数组、对象等，会自动JSON.stringify()
    // express提供的新方法:sendFile() -- 参数是一个文件（绝对）路径，会自动读取文件的内容，做出响应
    // res.sendFile(path.join(__dirname, 'books.json'))
    // express提供的新方法:res.json() -- 专门用于响应json数组的方法
    // res.json({
    //     status: 0,
    //     message: '添加成功'
    // })
    // express提供的新方法:res.set() -- 设置响应头一样，不能设置状态码
    res.set({
        'Author': 'zhangsan'
    })
    res.send('看看响应头')
});
```

### GET接口

```js
// app.get('请求的URL', callback)
app.get('/api/getbooks', (req, res) => {
    // 处理GET方式的/api/getbooks接口
})

app.get('/', (req, res) => {
    // 客户端没有指定请求的url，在这里处理
})

app.get('*', (req, res) => {
    // 处理所有的GET请求
})
/*
	app.get('*', (req, res) => {}) 
	他能够匹配到所有的GET请求
	所以把它放到所有接口的最后
*/
```

#### 获取GET方式请求的参数

> url`?参数=值&参数=值`

- 这种方式的参数，比较常规，参数部分也叫做**查询字符串**
- 请求地址的写法： http:【web协议】//localhost:3006/【域名】test?id=3&bookname=zxx&age=20【key=value&】

- 获取方式：`req.query`

  ```js
  app.get('/test'【url】, (req, res) => {
      console.log(req.query); 
  })
  ```

> url/`:id/:name/:age`

- 这种方式的参数，叫做**动态参数**
- 请求地址的写法：http:【web协议】//localhost:3006/【域名】test/3/zs/30【value】

- 要求请求的url参数必填，否则不能和定义的接口匹配

  ```js
  // 测试接口，获取动态参数
  app.get('/test/:id', (req, res) => {
  	console.log(req.params)
      res.send('收到参数')
  })
  
  // 测试接口，获取多个动态参数
  app.get('/test2/:id/:name/:age', (req, res) => {
      console.log(req.params); // 可以获取所有的动态参数
      res.send('全部收到')
  });
  ```

### POST接口

```js
// app.post('请求的URL', callback);
app.post('/api/addbook', (req, res) => {
    // 处理POST方式的/api/addbook接口
});

app.post('*', (req, res) => {
    // 处理所有的POST请求
})
```

#### 获取POST请求体

- GET方式没有请求体，POST方式才有请求体。
- 请求体，即客户端提交的数据。
- 我们仍然可以使用http模块中的语法，获取请求体。

- POST请求体，有哪些格式
  - 查询字符串 -- 对应的`Content-Type: application/x-www-form-urlencoded`
  - FormData对象 -- 对应的`Content-Type: multipart/form-data; --XXADFsdfssf`

