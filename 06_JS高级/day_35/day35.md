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
let refObj = {对象};
let newObj = {空对象};
function cloneDeep(newObj, refObj){
    for(let k in refObj){
       let item = refObj[k];
        /* typeof在检测Array和Object时都会显示Object，所以此处用instanceof*/
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
cloneDeep(newObj, refObj);
```

## 正则表达式

> **`RegExp`** 构造函数创建了一个正则表达式对象，用于将文本与一个模式匹配（多用于表单预校验）

### 创建正则对象

```js
// 方式1: 通过RegExp() 构造函数创建
var reg1 = new RegExp(/xyz/);

// 方式2: 通过字面量(语法糖) - 创建正则对象
var reg2 = /xyz/
```

### 正则-检测连续字符串

```js
/* 
	1、test()---正则对象方法
	2、参数是测试字符串
	3、该对象返回 true---必须是目标身上连续出现正则对象里的字符
	4、否则该对象会返回 false
*/
var reg = /xyz/;
var str = "xzsdafxy0zsdyzxsdfxy5zsdxyzfsadfsdxy4zfy";
console.log(reg.test(str));// true

var reg2 = /123/;
var str2 = "1sssss2ss3";
console.log(reg2.test(str2));// false
/* 必须出现过连续的123 */
```

### 正则-边界符

```js
/* 1、判断开头是否是xyz */
var reg = /^xyz/;
var str = "xyzsdfsdfsdfsdfsdfsdxyzsdfasdfsadf";
console.log(reg.test(str));//true

/* 2、判断结尾是否是xyz */
var reg2 = /xyz$/;
var str2 = "xxxxhahhaxyz";
console.log(reg2.test(str2));//true

/* 3、精确匹配 */
var reg3 = /^xyz$/;//只能出现xyz
var str3 = "xyzxxxhahhaxyz";
var str4 = "xyzxyz";
var str5 = "xyz";
console.log(reg3.test(str3));//flase
console.log(reg4.test(str4));//flase
console.log(reg5.test(str5));//true
```

### 正则-或（|）

```js
/* 以xyz开头, 或者以xyz结尾 */
var reg = /^xyz|xyz$/;
var str = "xyzxxxhahhaxyz";
console.log(reg.test(str));//true

/* 只要匹配其中一项就返回true */
var reg2 = /傻|笨蛋|可爱/;
var str = "这里有一个非常可爱的小姑娘";
console.log(reg2.test(str));//true
```

### 正则-中括号

```js
/* 表示有一系列字符可供选择，只要匹配其中一个就返回true([多选1] - [abcdefg]) */
var reg1 = /xyz/;
var str1 = "weweewrx0234afa";
console.log(reg1.test(str1)); // false

var reg1 = /[xyz]/;
console.log(reg1.test(str1)); // true

var rg = /[abc]/; // 只要包含有a 或者 包含有b 或者包含有c 都返回为true
var rg1 = /^[abc]/; // 只要以a或b或c开头的, 都为true
var rg2 = /[^abc]/; // 取反，一旦只出现a或b或c或字符组合，为false
var reg1 = /^[abc]$/; // 只能存在a或者b或者c，为true
console.log(reg1.test("abc")); // false
console.log(reg1.test("a")); // true
console.log(reg1.test("b")); // true
console.log(reg1.test("c")); // true
console.log(reg1.test("abc123abc")); // false
```

### 正则-量词符-基础使用

| 量词  |                    解释                    |
| :---: | :----------------------------------------: |
|   *   |          重复0次或更多次【>=0次】          |
|   +   |          重复1次或更多次【>=1次】          |
|   ?   |             至少重复0次或多次              |
|  {n}  |              连续重复至少n次               |
| {n,m} | 连续重复至少n或更多次 (注意不能有空格中间) |

- [0123456789] 等同于[0-9]
- 字母同理[abc…xyz]等同于[a-z]
- 字母大写同理[ABC…XYZ]等同于[A-Z]

### 正则预定义规则

```js
//  1、 \d ----> [0-9]
//  2、 \D ----> [0-9]以外所有字符(非数字)
//  3、 \w ----> [a-zA-Z0-9_](匹配包括下划线的任何单词字符, 不包括-字符)
//  4、 \W ----> [a-zA-Z0-9_]以外的字符
//  5、 \s ----> 特殊字符： \t \r \n \v \f 空白符
//  6、 \S ----> 除了特殊字符以外, 都可以

// 中文  “\u4e00”和“\u9fa5”是unicode编码，并且正好是中文编码的开始和结束的两个值
// /^[\u4e00-\u9fa5]{2,8}$/
console.log(/^[\u4e00-\u9fa5]{2,8}$/.test("会飞的企鹅"));
```

### 正则-str.replace()[字符串的方法]

```js
// 字符串的replace方法中, 可以传入正则表达式
var str = "他好像有点傻, 没有激情, Baby";
console.log(/(激情|傻)+/.test(str));
// 屏蔽傻, 激情等词汇
console.log(str.replace(/(激情|傻|b)+/, "*"));

// 引出ig的使用
// 正则后, 加g 全局替换(都替换), 加i 忽略大小写
console.log(str.replace(/(激情|傻|b)+/gi, "*"));
```

