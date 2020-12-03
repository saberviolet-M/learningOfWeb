# day35

## 拷贝

### 浅拷贝

> 地址拷贝

```js
var obj = Object.assign({目标对象},{源对象});//对象合并，浅拷贝
```

### 深拷贝

> 值拷贝

```js
/*1、借助第三方工具(lodash等)*/
//1、lodash文件引入
//2、调用lodash方法(深拷贝)
_.cloneDeep({对象})//_表示lodash暴露的变量名

/*2、数据转换方式*/
//JSON.parse()---对象类型的字符串转对象
//JSON.stringfy()---对象转对象类型的字符串
JSON.parse(JSON.stringfy({对象}));//实现深拷贝(慎用!!!)

/*3、自己封装方法*/
let obj = {对象};
let newObj = {空对象};
function cloneDeep(newObj, refObj){
    for(let k in refObj){
       let item = refObj[k];
        if(item instanceof Array){//判断是否是数组类型
            newObj[k] = [];
            cloneDeep(newObj[k], item);
        }else if(item instanceof Object){//判断是否是对象类型
            newObj[k] = {};
            cloneDeep(newObj[k], item);
        }else{
            newObj[k] = item;
        }
    }
}
```

