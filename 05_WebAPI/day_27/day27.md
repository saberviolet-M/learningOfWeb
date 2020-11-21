# day27

## DOM

### style属性（样式操作）

- style属性特点
  - 1、元素的style属性包含了当前元素的**所有行内样式**（存在一个对象里）
  - 2、元素的style属性可以**获取**行内样式也可以**设置**行内样式 
  - 3、样式中类似`background-color`等属性需要写成**驼峰命名**`backgroundCOlor`（因为`-`在js中不是一个合法的标识符），类似`width`等属性设置时需要**加单位**

### 获取元素对象的特殊操作：

- `document.body` ：直接获取body元素
- `document.documentElement` ：直接获取html元素
- `document.head` ：直接获取head元素
- `document.title` ：直接获取title中的文本

### 排他思想

> "干掉所有人（包括自己）"在偷偷“复活”

![排他思想](D:\1_2020Web\Note\05_WebAPI\day_27\media\排他思想.gif)

- 找到所有的按钮
- 给所有按钮注册点击事件
- 点击之后让自己变色
  - **排他思想：** 先让所有的都不变色（**清空所有**），再让当前这个变色（**单独设置**）

### 获取元素的方法

#### 通过id获取（通用）

```js
// 参数：元素的id属性值
// 返回值： 一个元素。如果不存在，会返回null
document.getElementById("id");
```

#### 通过标签名获取（通用）

```js
// 参数：标签名
// 返回值：伪数组。无论找到几个元素，返回值都是伪数组
document.getElementsByTagName("tagName");
```

---

> **以上两个是没有兼容性问题的，以下方法ie678不支持**

---


#### 通过类名获取（一般不用）

```js
// 参数：类名
// 返回值：伪数组。无论找到几个元素，返回值都是伪数组
document.getElementsByClassName("类名")
```

#### 通过name获取（一般不用）

```js
//只能用于表单元素，一般不用
// 参数：name属性值
// 返回值：伪数组。无论找到几个元素，返回值都是伪数组
document.getElementsByName("name属性值");
```

#### 获取单个元素（通过css选择器获取--常用）

```js
// 参数：css选择器
// 返回值：一个元素。如果有多个，则返回第一个，如果没有返回null
document.querySelector('css选择器')
```

#### 获取多个元素（通过css选择器获取--常用）

```js
// 参数：css选择器
// 返回值：伪数组。无论找到几个元素，返回值都是伪数组
document.querySelectorAll('css选择器');
```

