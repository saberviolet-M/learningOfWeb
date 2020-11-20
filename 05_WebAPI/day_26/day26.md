# day26

## WebAPI

### WebAPIの基本介绍

> JavaScript 包括ECMAScript&BOM&DOM
>
> WebApPI 包括BOM&DOM

- **ECMAScript（js的核心）**：定义了js的语法规范，描述了语言的基本语法和数据类型

  > ECMAScript是一套标准，定义了一种语言的标准与具体实现无关。

- **DOM（文档对象模型）**：一套操作页面元素的API（方法）

  > DOM可以把HTML看做是文档树，通过DOM提供的API可以对页面中的元素进行操作

- **BOM（浏览器对象模型）**：一套操作浏览器功能的API（方法）

  > 通过BOM可以操作浏览器窗口，比如：弹出框、控制浏览器跳转、获取分辨率等 

### DOM-文档对象模型（Document Object Model）

> 浏览器执行网页代码时，会将页面中所有的**元素**在内存中用**对象**表示，并且元素和对象是**一一对应**的。
>
> 因为HTML中标签的嵌套关系就类似于一个树形的结构，所有对应的对象之间也是树状结构。因此DOM又称为文档树模型

![DOMtree](D:\1_2020Web\Note\05_WebAPI\day_26\media\DOMtree.png)



#### DOM中常见的概念：

- 文档`document`：一个网页可以称为文档
- 节点`node`：网页中的所有内容都是节点（标签、文本、注释等）
- 元素`element`：网页中的标签（标签节点）

### 获取元素

#### 根据id获取元素

```js
//功能：通过id获取元素
//参数：字符串类型的id值
//返回值：元素，如果id不存在，会返回null
var box = document.getElementById('box');

console.log(box);//以标签形式打印
console.dir(box);//以对象形式打印
```

![byId](D:\1_2020Web\Note\05_WebAPI\day_26\media\byId.jpg)

- PS：部分浏览器，如果元素设置了id属性，可以直接通过id拿到元素使用（但是不是规范，不推荐）

#### 根据标签名获取元素

```js
//参数：标签名
//返回值：一个伪数组，伪数组不是真正的数组，有下标和长度，可以遍历，但是不能使用数组特定的方法
var divs = document.getElementsByTagName('div');

console.log(divs);
```

![byTagName](D:\1_2020Web\Note\05_WebAPI\day_26\media\byTagName.jpg)

### 注册事件

#### 事件三要素：

- 事件源： 触发事件的那个元素（比如：按钮、盒子）
- 事件名： 事件的名称（比如：点击、移入......）
- 事件处理程序**：**触发事件之后要执行的代码（一般就是一个函数）

#### 基本语法：

> 事件源.on事件名 = 事件处理程序

- **例：**

- **需求：** 点击一个按钮，在控制台打印一句话

- **代码：**

  ```js
  var btn = document.getElementById('btn');
  // on：当
  // click:点击 >>> 当按钮被点击的时候触发
  btn.onclick = function() {
    console.log('哎呀，被点击了！');  
  };
  //事件处理程序并不是立马执行，只有当事件被触发时，才会在会执行
  ```

  ![注册事件](D:\1_2020Web\Note\05_WebAPI\day_26\media\注册事件.jpg)

- PS：在直接改变class属性时，JS中需要通过**className**表示，因为**class**是关键字

#### 鼠标事件

- **on**click---鼠标点击事件源
- **on**mouseover---鼠标移入事件源
- **on**mouseout---鼠标移出事件源

### 事件中的this

> 事件处理函数中this表示就是触发事件的事件源

### 阻止a标签跳转（操作の一）

> 在事件处理函数中，**最后**写上`return false` ，可以**阻止a标签的跳转**功能

### innerText与innerHTML

> 表单标签修改`value`属性修改内容
>
> 其他标签通过`innerText`与`innerHTML`修改**标签内的**内容

- 区别：
  - innerText属性：
    - 只能获取文本---如果有标签会忽略
    - 只能设置文本---当设置的是标签时，标签不能被解析，标签不能生效
  - innerHTML属性：
    - 可以获取文本和标签
    - 可以设置文本和标签---当设置的是标签，标签可以被解析，标签可以生效

  ```html
  <div id="father">
      我是father中的内容
      <h1>我是一个h1标签</h1>
  </div>
  
  <script>
      var box = document.getElementById('father');
  
      // 获取内容
      console.log(box.innerText); // 只能获取文本
      console.log(box.innerHTML); // 能获取文本和标签
  
      // 设置内容
      box.innerText = '<h1>我是一个h1标签</h1>'; // 只能设置文本，不会解析标签
      box.innerHTML = '<h1>我是一个h1标签</h1>'; // 能设置文本和标签，标签会被解析
  </script>
  ```

  ![innerText-innerHTML](D:\1_2020Web\Note\05_WebAPI\day_26\media\innerText-innerHTML.jpg)

- PS：需要确保innerHTML内容安全，因为innerHTML会解析标签

### 表单属性操作

- value---表单内容

  - 通过value属性可以**获取/设置**textarea内容

- PS:

  - onfocus---**获得**焦点事件

  - onblur---失去焦点事件

### 布尔类型属性

> 值只能是true或者false

- disabled：true表示禁用
- checked：true表示**单选或多选**的选中
- selected：true表示option被选中

