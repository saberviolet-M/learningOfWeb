# day56

## http 模块

> http 模块是 Node.js 官方提供的、用来创建web 服务器和客户端的模块。它提供了一系列的方法和属性

- http.createServer() 方法，用来创建一个web 服务器，从而对外提供web 资源

- http.request() 方法，用来发起 http 网络请求，请求其它web 服务器上的资源

- 如果要在 JavaScript 代码中使用 http 模块，则需要先导入它

  ```js
  
  ```

### 创建Web服务器

#### 导入http模块

```js
const http = require('http')
```

#### 创建服务器

```js
const server = http.createServer()
```

#### 启动服务器

```js
server.listen(3000【端口号】,【回调函数】() => {
    console.log('my server start work');
})
```

#### 监听请求

```js
server.on('request'【请求事件】,【回调函数】() => {
    console.log('哈哈哈，你是不是一直在转圈呀？');
});
```



## npm初步使用