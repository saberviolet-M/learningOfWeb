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

## 模版引擎art-template（库）

> **本质就是字符串替换**

### 作用

- **更高效的渲染页面**

### 使用流程

- **1、导入库（导包）**

- **2、写模版（特殊的script标签）**

  - 书写位置（body里，body的亲儿子）

  - ```html
    <script id="模版名" type="text/html"></script>
    ```

  - `<script></script>`中写语法

- **3、调用核心方法**

  - 书写位置`<script></script>`里

  - ```js
    template('模版名'，要渲染的js对象)
    ```

  - 返回渲染之后的`html`字符串

- **4、渲染好的html字符串显示到页面**

### 模版语法

### 输出语法

- 支持对象点语法，数组语法
- 支持三元表达式
- 支持二元表达式：算术运算、逻辑运算

```html
<!-- 标准语法（常用语法---简写形式） -->
<标签>{{ value }}</标签>
<标签>{{ data.key }}</标签>
<标签>{{ data['key'] }}</标签>
<标签>{{ a ? b : c }}</标签>
<标签>{{ a || b }}</标签>
<标签>{{ a + b }}</标签>
```

```html
<!-- 原始语法（标准格式）） -->
<标签><%= value %></标签>
<标签><%= data.key %></标签>
<标签><%= data['key'] %></标签>
<标签><%= a ? b : c %></标签>
<标签><%= a || b %></标签>
<标签><%= a + b %></标签>
```

#### 分支语法

- **if语法**

  ```html
  {{if 条件}}
  	<标签>……</标签>
  {{/if}}
  ```

- **if --- else**

  ```html
  {{if 条件}}
  	<标签>……</标签>
  {{else}}
  	<标签>……</标签>
  {{/if}}
  ```

- **循环语法**

  ```html
  {{each 目标(target)}}
  	<标签>下标：{{$index}}</标签>
  	<标签>元素：{{$value}}</标签>
  {{/each}}
  ```

### 易错总结