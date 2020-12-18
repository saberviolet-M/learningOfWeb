# day44

## 前置

### 1、什么是服务器

- 提供某种服务的机器（电脑）
### 2、浏览器与服务器交互流程

- 访问服务器方式
  - 地址栏输入
  - a标签的href属性
  - window.location.href
  - ajax技术（上述会跳转网页，ajax则不跳转网页）
- 前后端交互流程
  - 1、**浏览器**发送请求
  - 2、**服务器**处理请求
  - 3、**服务器**响应本次请求结果

## ajax

### ajax技术

- 1、在网页不跳转的情况下向服务器请求数据（局部刷新，调高网络性能）

- 2、XMLHttpRequest（xhr对象---小黄人对象）：JS内置对象，用于实现ajax请求

### ajax使用流程

#### 原生JS下（4步代码）

```js
//1.创建xhr对象
let xhr = new XHLHttpRequest;
//2.设置请求方法（参数1）和地址（参数2）
xhr.open('方法','地址');
//3.发送请求
xhr.send();
//4.注册响应回调事件(服务器响应数据的时候会执行，执行时机不固定，取决于带宽+数据大小+天气等种种因素)
xhr.onload = function(){
    xhr.responseText;//响应文本
};
```

### ajax请求方法---get&post

#### get请求参数

- 格式（在url后拼接）：
  - url?key（后台定死）=value（前端请求）
  - 格式中不出现空格

#### post请求参数

- 格式：

  - 设置请求头（固定格式），置于 `xhr.send()`之前，`xhr.open()`（open之后才确定是`get`还是`post`）之后

    ```js
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    ```

  - `send(key=value)`

## JSON（跨平台）

### 产生原因

- 不同的编程语言的数据类型不同，后台使用的可能是不同的语言（PHP、C++、C#、JavaScript……）

### JSON本质和作用

- `JSON`是一种数据交换**格式**，本质是**字符串**
- `JSON`的作用是为了解决跨平台问题

### JSON格式

- 对象`{ }`---**大括号**

- 数组`[ ]`---**中括号**

- 文本`" "`---**双引号**

### JSON与js的互换

- `JSON.parse()`---解析`JSON`字符串**到JS对象**

- `JSON.stringify()`---转化**JS对象**到`JSON`字符串

