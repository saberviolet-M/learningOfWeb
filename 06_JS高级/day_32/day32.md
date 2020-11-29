# day32

## 构造函数

#### 基础语法

```js
function Object([params]) {//函数名首字母大写(约定俗称，不是规定)、可传入参数
    //键值对绑定属性
	this.key = value(params);//value可为传入的参数(params)，也可自定义value值
    
    //匿名函数创建方法
    this.method = fn(){
        //代码段
    }
}
var obj = new Object();//构造函数创建对象
//不涉及传入参数时带不带()都是一样的
Object.key//属性访问
Object.method()//方法的调用
```

#### this

- 普通函数、`var`声明的全局变量会默认成为window的**属性**和**方法**
- 构造函数的this会指向它的的实例

#### new

> 1、创建一个空对象
>
> 2、将函数中的this指向空对象
>
> 3、赋值操作
>
> 4、返回一个实例化の对象