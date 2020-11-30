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

> 继承：子构造函数继承父构造函数的属性和方法

- 原型链继承

  > 1、子构造函数的原型对象指向父构造函数的原型对象
  >
  > - 缺点：方法能用，属性不能用
  >
  > 2、子构造函数的原型对象指向了父构造函数的实例，并且传递参数
  >
  > - 缺点：属性继承是唯一的

