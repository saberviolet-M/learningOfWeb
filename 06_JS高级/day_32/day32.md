# day32

## 构造函数

#### 基础语法

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

#### thisの指向

- 普通函数的this会指向window
- 构造函数的this会指向它的实例

#### newの作用

> 1、创建一个空对象
>
> 2、将函数中的this指向空对象
>
> 3、赋值操作
>
> 4、返回一个实例化の对象

#### prototype---原型属性

> 任何**构造函数**都有`prototype`属性，**指向**当前构造函数的原型（原型对象）
>
> 在构造函数的原型对象上添加**共享**的属性和方法，以节省内存

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

#### \_\_proto\_\_(隐式原型)

> 实例对象的`__proto__`属性值是一个对象，和构造函数的`.prototype`的值是一样的
>
> 构造函数的`.prototype`和实例对象的`__proto__`指向同一个对象

#### 原型链

