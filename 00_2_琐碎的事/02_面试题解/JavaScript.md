## typeof和instanceof的区别

`typeof`可以用来判断**原始数据**的**基本类型**

- 除了`null`其它原始类型都可以正确的判断

- **函数**可以正确判断，其它复杂类型返回结果都为`Object`

`instanceof`是通过原型链的方式判断数据类型的

- 可以判断**对象**，相对的不能正确判断**原始数据类型**

## 函数中的this

- 箭头函数
  - 箭头函数没有`this`，所以`this`指向包裹它的第一个**原始函数**
- `bind`、`call`、`apply`
  - `this`指向**第一个参数**，如果参数为空则指向`window`
- 普通函数
  - 取决于**如何**被调用
    - `new`
      - `this`指向它的**实例**
    - 没有`new`
      - 取决于调用**方式**
        - `Object.func`指向Object
        - `func`指向`window`
        - **异步调用**指向`window`

## Object.create(null)初始化对象

- 使用Object.create(null)创建的对象是一个没有继承关系的对象，并且原型上的所有方法和属性全部被抛弃

## 证明判断json

```js
function isJson(str){
    try{
        if(typeof JSON.parse(str) == 'object'){
            return true
        }
    }catch(e){}
    return false
}
```

