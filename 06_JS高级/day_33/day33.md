# day33

## this（硬绑定--更改this）

### call()--方法

- 参数1---更改的this指向

- 参数2开始为原函数的**参数列表**

- 立即执行函数

  ```js
  function fn(param1, param2) {
      console.log(this);
      this.b = param1;
      this.d = param2;
      console.log(this.b);
      console.log(this.d);
  }
  var obj = {
      a: 10
  };
  fn('fn:b', 'fn:d');//普通函数的this指向window
  fn.call(obj, 'fn.call:B', 'fn.call:D');
  ```

  ![fn.call()](D:\1_2020Web\Note\06_JS高级\day_33\media\fn.call().jpg)

### apply()--方法

- 参数1---更改的this指向

- 参数2为**数组**，内容为原函数的参数列表

- 立即执行函数

  ```js
  /*
  	代码段同上
  */
  fn.apply(obj, ['fn.call:B', 'fn.call:D']);
  //结果同上
  ```

### bind()--方法

- 参数1---更改的this指向
- 参数2开始为原函数的**参数列表**

- **不会立即执行**函数，而是返回一个该函数的一个拷贝，需要手动调用函数

  ```js
  /*
  	代码段同上
  */
  var res = fn.bind(obj, 'fn.call:B', 'fn.call:D');
  res();
  //结果同上
  ```

## 继承

> 继承：子构造函数**允许访问**父构造函数的属性和方法

### 原型链继承

> 1、子构造函数的原型对象指向父构造函数的原型对象
>
> - 缺点：方法能用，属性不能用

```js
/* 父构造函数 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}
/* 父构造函数prototype方法 */
Person.prototype.say = function() {
    console.log('Say what?');
}
/* 子构造函数 */
function Student(grade) {
    this.grade = grade;
}
/* 子构造函数的原型对象指向父构造函数的原型对象 */
Student.prototype = Person.prototype;
var saber = new Student(100);
console.log('saber', saber);
/* 方法能用 */
saber.say();
/* 属性不能用 */
console.log('saber.grade', saber.grade);
console.log('saber.name', saber.name);
console.log('saber.age', saber.age);
```

![原型链继承-0](D:\1_2020Web\Note\06_JS高级\day_33\media\原型链继承-0.jpg)

> 2、子构造函数的原型对象指向了父构造函数的实例，并且传递参数
>
> - 缺点：属性继承是唯一的

```js
/* 父构造函数 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}
/* 父构造函数prototype方法 */
Person.prototype.say = function() {
    console.log('Say what?');
}
/* 子构造函数 */
function Student(grade) {
    this.grade = grade;
}
/* 子构造函数的原型对象指向了父构造函数的实例，并且传递参数 */
Student.prototype = new Person('saber', 16);
var saber = new Student(100);
console.log('saber', saber);
saber.say();
/* 属性继承是唯一的 */
console.log('saber.grade', saber.grade);
console.log('saber.name', saber.name);
console.log('saber.age', saber.age);
```

![原型链继承](D:\1_2020Web\Note\06_JS高级\day_33\media\原型链继承.jpg)

### 借用构造函数继承

> 1、在子构造函数中调用父构造函数，更改父构造函`this`指向，使其指向子构造函数的实例
>
> - 缺点：只继承了属性没有继承方法

```js
/* 父构造函数 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}
/* 父构造函数prototype方法 */
Person.prototype.say = function() {
    console.log('Say what?');
}
/* 子构造函数 */
function Student(grade, name, age) {
    this.grade = grade;
    /* 在子构造函数中调用父构造函数，更改父构造函this指向，使其指向子构造函数的实例 */
    Person.call(this, name, age);
}
var saber = new Student(100, 'saber', 16);
console.log('saber', saber);
/* 只继承了属性没有继承方法 */
saber.say();
```

![构造函数继承](D:\1_2020Web\Note\06_JS高级\day_33\media\构造函数继承.jpg)

### 寄生组成继承

>1、寄生组成继承 = 原型继承 + 构造函数继承
>
>2、完成了属性和方法的继承
>
>- 缺点：寄生组成继承完成后在**子构造函数的原型**中定义的方法不能调用

```js
/* 父构造函数 */
function Person(name, age) {
    this.name = name;
    this.age = age;
}
/* 父构造函数prototype方法 */
Person.prototype.say = function() {
    console.log('Say what?');
}
/* 子构造函数 */
function Student(grade, name, age) {
    this.grade = grade;
}
/* 子构造函数prototype方法 */
Student.prototype.talk = function() {
    console.log('Say so!');
}
/* 寄生组成继承 */
Student.prototype = Object.create(Person.prototype);
var saber = new Student(100, 'saber', 16);
console.log('saber', saber);
saber.say();
console.log('saber.grade', saber.grade);
console.log('saber.name', saber.name);
console.log('saber.age', saber.age);
/* 寄生组成继承完成后在子构造函数的原型中，之前定义的方法不能调用 */
saber.talk();
```

![寄生组成继承](D:\1_2020Web\Note\06_JS高级\day_33\media\寄生组成继承.jpg)

## constructor

> 构造函数的原型对象（`.prototype`）的`constructor`属性指向当前的构造函数

## 面向对象编程-类

> ES6提出了类的概念
>
> - 类可以理解为构造函数的语法糖
>
> - 类的原型对象和实例的原型指向同一个对象
>
> - 类中方法指向`new`的实例
>
> - 类中定义的方法会挂载到原型上

### 语法

```js
class 类名 {
    /* 一旦new，constructor中的代码就会自动执行 */
    constructor(param1, param2) {
        this.key1 = param1;
        this.key2 = param2;
    }
    方法名1(){
        /* 代码块 */
    }
    方法名2(){
        /* 代码块 */
    }
}
```

### 静态成员和实例成员

- `static`修饰的属性或方法不允许实例调用，只能被`class`使用
- 实例成员写在`constructor`内部，允许被实例调用

