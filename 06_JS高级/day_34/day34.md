# day34

## 严格模式（strict mode）

> IE10以上支持严格模式，IE10以下会被忽略

### 使用

```js
'use strict';//开启脚本严格模式(写在脚本<script>开头</script>)
function fn(){
    'use strict';//开启函数内严格模式(写在函数开头)
}
```

### 规则

- 变量必须先声明（伴随变量声明关键字`var、let、const`）再使用（预解析不变）
- 不可删除变量（`delete`不可用）
- **全局函数**里的this指向undefined，其余不变

## 新增数组方法

### forEach（）

- 参数接收函数`function(item,index,array){}`
  - 函数内部有三个参数
  - `item`---数组元素
  - `index`---数组下标（索引）
  - `arr`---当前遍历数组

- 无返回值(`undefined`)（单纯遍历）

### map（）

- 参数接收函数`function(item,index,array){}`
  - 函数内部有三个参数
  - `item`---数组元素
  - `index`---数组下标（索引）
  - `arr`---当前遍历数组

- 返回一个**新**数组，数组内容是`return`的结果

### some（）

- 参数接收函数`function(item,index,array){}`
  - 函数内部有三个参数
  - `item`---数组元素
  - `index`---数组下标（索引）
  - `arr`---当前遍历数组

- 返回布尔值`boolean`
  - 存在一个元素**满足**条件**即为真`true`**并且**立刻终止**循环，**否则为假**（数组检索）

### every（）

- 参数接收函数`function(item,index,array){}`
  - 函数内部有三个参数
  - `item`---数组元素
  - `index`---数组下标（索引）
  - `arr`---当前遍历数组

- 返回布尔值`boolean`
  - 存在一个元素**不满足**条件**即为假`false`**并且**立刻终止**循环终止，**否则为真**（数组检索）

### filter（）

- 参数接收函数`function(item,index,array){}`
  - 函数内部有三个参数
  - `item`---数组元素
  - `index`---数组下标（索引）
  - `arr`---当前遍历数组

- 返回一个**新**数组，内容是满足条件的元素

### find（）

- 参数接收函数`function(item,index,array){}`
  - 函数内部有三个参数
  - `item`---数组元素
  - `index`---数组下标（索引）
  - `arr`---当前遍历数组

- 做数组元素查找，返回值为满足条件的数组元素

### findIndex（）

- 参数接收函数`function(item,index,array){}`
  - 函数内部有三个参数
  - `item`---数组元素
  - `index`---数组下标（索引）
  - `arr`---当前遍历数组

- 做数组元素查找，返回值为满足条件的数组元素下标（索引）

### reduce（）

- 参数接收函数`(function(sum,item,index,array){},[sumValue])`
  - 函数内部有三个参数
  - `sum`---累计运算的初始值（**不设置值**时为**数组索引为0**的数据）
  - `sumValue`---sum的设置值
  - `item`---数组元素
  - `index`---数组下标（索引）
  - `arr`---当前遍历数组

- 做累计运算，返回值为运算结果

  ```js
  let arr = [3, 6, 5, 5, 2, 6, 5, 6, ];
  let newArr = arr.reduce(function(sum, item, index) {
      return sum + 5;
  }, 5);
  console.log(newArr);//结果为 45
  ```

### Array.from（）

- 参数为伪数组
- 将类似数组的集合转换成真正的数组

## 函数

### 普通函数

```js
function fn(){}
```

### 函数表达式

```js
var fn = function(){}
```

### 对象里的函数

```js
var obj = {
    fn:function(){}
}
```

### 事件处理函数

```js
function fn(){}
document.addEventListener('事件名',fn);
document.addEventListener('事件名',function(){});
```

### 定时任务里の函数

```js
setInterval(function(){});//定时
setTimeOut(function(){});//延时
```

### 构造函数

```js
function Fn(){}
```

### 匿名函数

> 没有**函数名**的函数就是匿名函数

### 立即执行函数（自调用函数）

```js
(function(形参){})(实参);//写法一
(function(形参){}(实参));//写法二
!function(形参){}(实参);//写法三
```

### 递归函数

> 函数内部调用自己的函数，**切记**退出条件,否则会**栈溢出**

### 高阶函数

> 函数可以作为**参数**或者**返回值**使用的函数，称为高阶函数

