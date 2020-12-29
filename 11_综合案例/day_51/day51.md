# day51

## 封装模块

- 业务文件和数据请求分离

  > 业务文件只使用数据，不关心数据如何获得

- **utils.js**---业务辅助函数的文件（约定俗成的名称）

### 回调函数（callback）

> **说明**：
>
> - 函数A的形参是函数B
>
> **功能**：
>
> - 解决异步外获取异步内部产生的结果
>
> **异步操作**：
>
> - 定时器/ajax/事件

- **api.js**---项目请求方法的文件（约定俗成的名称）

  - 当遇到 异步操作（定时器/ajax/事件时），在结果出现的位置调用**形参**函数，可将结果传递到外部

    ```js
    function fn1(fn2){
        let a = 10
        setTimeout(()=>{
            a++
            fn2(a)
        },1000)
    }
    fn1(function(x){
        console.log('x=>',x)
    })
    ```

    ![callback](D:\1_2020Web\Note\11_综合案例\day_51\media\callback.jpg)

### axios配置---baseURL

```js
axios.defaults.baseURLl = '基地址';//axios方法，自动添加在请求的url之前
```

### axios配置---响应拦截器

> 在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // （本案例）处理res响应结果=>if status || 弹窗
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
```

##  登录---安全验证---token存储

> token和正确用户是唯一绑定的
>
> localStorage
>
> - 永久保存数据（数据持久化处理）
>
> 存储位置（查看）
>
> - F12=>Application=>localStorage

```js
window.localStorage.setItem('key名',value-要保存的数据)
//window.localStorage.setItem('token',token)
```

## 主页（index）

### 标签&样式

- html

  ```html
  
  ```

- layui.css

- index.css

  ```css
  
  ```

### 行为

- layui.js---配合layui.css的交互效果
- jquery.js
- utils.js
- axios.js
- api.js

- index.js

