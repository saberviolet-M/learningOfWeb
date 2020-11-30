# day32

## 构造函数

### 基础语法

```js
function Object([params]) {//函数名首字母大写(约定俗称，不是规定)、可传入一个或多个参数
    //键值对绑定属性
	this.key = value;//value可为传入的参数值(params)，也可自定义属性值
    
    //匿名函数添加方法
    this.method = fn(){
        //代码段
    }
}
var obj = new Object();//构造函数创建对象
//不涉及传入参数时带不带()都是一样的
Object.key//属性访问
Object.method()//方法的调用
```

### newの作用

> 1、创建一个空对象
>
> 2、将函数中的this指向空对象
>
> 3、赋值操作
>
> 4、返回一个实例化の对象

### prototype（原型对象）

> 任何**构造函数**都有`prototype`属性，**指向**当前构造函数的原型（原型对象）
>
> 在构造函数的原型对象上添加**共享**的方法，以节省内存

```js
function Person(name) {
    //在构造函数中添加属性
    this.theName = name;
    //在构造函数中添加方法
    this.say = function() {
        console.log('学习说话');
    }
}
//在原型对象上添加方法
Person.prototype.sing = function() {
    console.log('学习唱歌');
}
//在原型对象上添加属性
Person.prototype.sex = 'man';
//实例化对象perA
var perA = new Person('A');
//实例化对象perB
var perB = new Person('B');
//通过构造函数实例化的对象都是单独的个体,其属性和方法在内存中存储在不同区域，
console.log('this.theName：', perB.theName === perA.theName);
console.log('this.say：', perB.say === perA.say);
//.prototype可以共享属性和方法，实例对象通过地址访问.prototype中的共享属性和方法，以达到节省内存的效果
console.log('prototype.sex：', perB.sex === perA.sex);
console.log('prototype.sing：', perB.sing === perA.sing);
```

![prototype](D:\1_2020Web\Note\06_JS高级\day_32\media\prototype.jpg)

### \_\_proto\_\_(对象的原型)

> 实例对象的`__proto__`属性值是一个对象，和构造函数的`.prototype`的值是一样的
>
> 构造函数的`.prototype`和实例对象的`__proto__`指向同一个对象

### 原型链

> 实例访问属性或方法时，首先在实例对象自身上找（优先使用自身属性或方法），如果自身没有，则在实例对象的原型上查找（一直向上，直到查找到，如果一条链条上没有则报错），此过程称为原型链（原型链的结束为null，再往上查找则会报错）

```js
var obj = new Object();
console.log(obj.__proto__);
console.log(obj.__proto__.__proto__);
console.log(obj.__proto__.__proto__.__proto__);
```

![proto](D:\1_2020Web\Note\06_JS高级\day_32\media\proto.jpg)

### instanceof（检测数据类型）

> `typeof`检测基本数据类型，对于数组、对象返回结果都是object
>
> `instanceof`检测基本数据类型
>
> 语法：数据 instanceof 数据类型
>
> 返回值：Boolean值，真为true，假为false

## thisの指向

> 谁调用`this`指向谁，`this`只有在运行过程中才能确定指向

### 全局的`this`指向window

```js
console.log('全局this', this);
```

![全局this](D:\1_2020Web\Note\06_JS高级\day_32\media\全局this.jpg)

### 事件处理函数中`this`指向事件源

```html
<button>🎲🎲🎲</button>
```

```js
document.querySelector('button').onclick = function() {
    console.log('buttonのthis', this);
}
```

![事件函数this](D:\1_2020Web\Note\06_JS高级\day_32\media\事件函数this.jpg)

### 普通函数调用`this`指向window

```js
function fn() {
    console.log('fnのthis', this);
}
fn();
```

![普通函数this](D:\1_2020Web\Note\06_JS高级\day_32\media\普通函数this.jpg)

### 定时任务中的`this`指向window

```js
setTimeout(function() {
    console.log('定时器のthis', this);
}, 0);
```

![定时器this](D:\1_2020Web\Note\06_JS高级\day_32\media\定时器this.jpg)

### 对象中的`this`指向对象本身

```js
var obj = {
    a: 10,
    fn: function() {
        console.log('对象のthis', this);
    }
}
obj.fn();
```

![对象this](D:\1_2020Web\Note\06_JS高级\day_32\media\对象this.jpg)

### 构造函数中的`this`指向实例化对象

```js
function Person() {
    console.log('构造函数のthis', this);
}
new Person();
```

![构造函数this](D:\1_2020Web\Note\06_JS高级\day_32\media\构造函数this.jpg)

