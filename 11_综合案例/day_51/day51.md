# day51

## 封装

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

### axios封装---baseURL

```js
axios.defaults.baseURLl = '基地址'//axios方法，自动添加在请求的url之前
```

