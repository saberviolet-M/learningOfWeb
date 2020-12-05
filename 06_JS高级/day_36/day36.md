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

## 箭头函数

## ES6新增数据类型

