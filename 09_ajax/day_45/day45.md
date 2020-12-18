# day45

## ajax的多参数传递

- ```js
  key1=value1&key2=value2&key3=value3//&符连接多组键值对
  ```

- **get与post的多参数传递格式相同**

  ```js
  /* get */
  url?key1=value1&key2=value2&key3=value3
  /* post */
  xhr.send('value1&key2=value2&key3=value3')
  ```

## JQ下使用ajax

### $.get(url, *[data]*, *[callback]*, *[type]*)

- **url：**待载入页面的URL地址（参数可以拼接在url之后）
- **data：**待发送 Key/value 参数
- **callback：**载入成功时回调函数
- **type：**返回内容格式，xml, html, script, json, text, _default

### $.post(url, *[data]*, *[callback]*, *[type]*)

- **url：**发送请求地址
- **data：**待发送 Key/value 参数
- **callback：**发送成功时回调函数
- **type：**返回内容格式，xml, html, script, json, text, _default

### $.ajax({})---最常用

- **以对象传值**

```js
$.ajax({
    url:'',
    /* 限制服务器返回为json格式 */
    dataType:'json',
    /* method也可以写做type */
    method:'get/post',
    /* 可以对象传入多个键值对 */
    [data:{
        key1:'value1',
        key2:'value2'
    },]
    success:function(backData){}
})
```

### 使用的注意点

- JQ会将`json`格式的数据转换成js对象，底层JSON.parse()
- 如果后台发送不是`json`格式则JQ不会处理
- 几乎所有接口的返回都是`json`格式
- `dataType:'json',`---限制服务器返回为json格式（一种规范，要求后台必须返回json）

## 模版引擎art-template

