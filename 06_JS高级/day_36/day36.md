# day36

## ES6中的变量声明

### let

> `let`作用在于避免变量名冲突，解决变量污染的问题

- 1、`let`在代码块作用域范围内声明变量（变量在大括号内有效，包括`for、if`语句中の大括号）
- 2、`let`**不能**重复声明同名变量
- 3、`let`声明的变量必须**先定义，再使用**
- 4、`let`の变量声明，预解析时**不提前**
- 5、`let`声明的**全局变量**不会挂载在window上，而是在Script（window同级的作用域）

### const

- 1、`const`用于声明常量，赋值**不允许被修改**

- 2、`const`声明的**常量**不会挂载在window上，而是在Script（window同级的作用域）

- 3、`const`声明の常量，**具备块级作用域**

- 4、`const`在同一作用域下, **不能重复使用同名声明**

  ```js
  const A = 1;
  const A = 3;
  console.log(A);//SyntaxError: Identifier 'A' has already been declared
  ```

- 5、`const`声明的常量必须**先定义，再使用**

- 6、`const`必须在声明时赋值

- 7、`const`（约定俗成）常量名为**大写**

- 8、复杂数据类型中的某个字段可以修改，但是整个常量不允许被重新赋值

  ```js
  const arr = [1,2,true]
  arr[2] = false;
  console.log(arr);//The expected output: [1, 2, false]
  arr = [1,2,false];//TypeError: Assignment to constant variable.
  ```

## 解构赋值

> ES6允许按照一个模式，从目标结构(数组/对象)中提取值，赋予给变量

```js
let arr = ["春天", "夏天", "秋天", "冬天"];
let [winOne, winTwo, winThree, winFour] = arr;//解构出的变量可以自定义名称
let [,, winThree] = arr;//可解构单独一项

/*******************************************************************************************************/

let obj = {
    username: "张三",
    age: 18
}
let { username: myUserName, age } = obj;//获取key(键必须在源对象出现过，否则报错)，可以自定义别名,避免变量名冲突
console.log(myUserName, age);//The expected output: 张三 18
console.log(username);//ReferenceError: username is not defined
//自定义别名后不能通过原变量名访问
```

## 模板字符串

- 1、模板字符串必须用`` （反引号）

- 2、可以换行
- 3、可以嵌入标签
- 4、变量部分可用`${xxx}`

## 箭头函数

### 基础语法

```js
let fn = () => {
    //代码段
}
```

#### 使用场景

- 1、无参, 无返回 

  ```js
  /* 无参, 无返  */
  let fn1 = () => {
      console.log('无参, 无返');
  }
  ```

- 2、 无参, 有返回 

  ```js
  /* 无参, 有返  */
  let fn2 = () => {
      let str = '无参, 有返'
      return str;
  }
  ```

- 3、 有参, 无返回 

  ```js
  /* 有参, 无返  */
  let fn3 = (param) => {
      console.log(param);
  }
  ```

- 4、 有参, 有返回 

  ```js
  /* 有参, 有返  */
  let fn4 = (param) => {
      let ret = param;
      return ret;
  }
  ```

#### 简化写法

- 1、参数只有1个, 可以省略小括号

  ```js
  let fn = param =>{
      //代码段
  }
  ```

- 2、方法体只有一行代码, 可以省略大括号, 省略大括号后, 默认返回此结果

  ```js
  let fn = param => param;
  
  /* 例如数组中选取大于50的数字 */
  let arr = [1, 22, 333, 41, 5, 54]
  const res = arr.filter(item => item>50);
  console.log(res);//The expected output: [333, 54]
  ```

#### 箭头函数局限

- 不能使用arguments

  > **arguments**---实参列表的集合
  >
  > - 伪数组
  >- 不用考虑实参与形参的一一对应关系
  
- 不能用作构造函数，不能被`new`
  
  - 因为没有`prototype`属性（没有原型）

#### 箭头函数this指向

* 1、`function`函数： this指向的是函数的调用者
* 2、箭头函数：`this`指向在定义时确定而不是运行时确定，`this`指向的是上一层作用域中的`this`

### 剩余参数运算符`...`(reset)

> `...变量名`表示剩余参数（变量名自定义）
>
> 接收**个数不确定**的参数值, 形成一个**数组**使用

- 一般配合箭头函数, 因为箭头函数内不能用`arguments`
- 必须出现在形参的最后面

### 展开语法(spread)

> `...`---不在函数中表示展开
>
> 将集合中的每一项展开，可用于**浅**拷贝对象/数组

```js
let arr = [5, 1, 7, 3];
console.log(...arr);//The expected output: 5 1 7 3
```

## ES6新增数据类型

### Set容器

> 无序**不重复**的多个value的集合体
>
> 数组是有序可重复的,   Set是无序不重复的

```js
let set = new Set([1, 3, 3, 2, 3, 4, 1, 5]);
```

- set.add(value)---添加

- set.delete(value)---删除

- set.has(value)---查找(返回true, 代表存在)

- set.size---容器的长度

- for...of---遍历

  ```js
  for(let value of set){}
  ```

- set.clear()---清空

### Map容器

> 无序**不重复**（指key不重复）的多个key-value的集合体
>
> Object对象的key只能是字符串, 而Map的key可以是任意类型

```js
let map = new Map([['bbcc', 12],[25, 'age'],[document.body,100]]);
```

- map.set(key, value)---添加

- map.get(key)---获取key的值

- map.delete(key)---删除

- map.has(key)---查找(存在为true)

- map.size---容器的长度

- for...of---遍历

  ```js
  for(let key of map){}
  for(let [key,value] of map){}
  ```

- map.clear()---清空

## 键值对简化写法

- 省略同名的属性值

- 省略方法的 "  : function " 可以省略

  ```js
  let x = 10;
  let y = 20;
  let obj = {
      x,
      y,
      getPosition(){
          return obj.x
      }
  }
  ```

  

