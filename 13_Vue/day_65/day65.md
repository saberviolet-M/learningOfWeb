# day65

## vue的插值表达式（mastache语法）

### 作用  

- 使用 data 中的数据渲染视图

### 基本语法（支持三元运算符）

 ```js
{{ msg }}
{{ obj.name }}
{{ msg.toUpperCase() }}
{{ obj.age > 18 ? '成年' : '未成年' }}
 ```

### vue中插值表达式的注意点

- 使用的数据在 data 中要存在

  ```jsx
  <h1>{{ gaga }}</h1>
  /*
  data() {
      return {
          gaga: "Hello",
      };
  },
  */
  ```

- 能使用表达式, 但是不能使用 if  for

  ```jsx
  //不行
  <h1>{{ if (obj.age > 18 ) { }   }}</h1>
  ```

- 不能在标签属性中使用

  ```jsx
  //不行
  <h1 id="box" class="box" title="{{ msg }}"></h1>
  ```

## vue指令

> vue指令, 实质上就是特殊的 html 标签属性, 特点:  v- 开头
>
> 每个 v- 开头的指令, 都有着自己独立的功能, 将来vue解析时, 会根据不同的指令提供不同的功能

### v-bind指令

- 描述：插值表达式不能用在html的属性上，如果想要动态的设置html元素的属性，需要使用v-bind指令

- 作用：动态的设置html的属性

- 语法：`v-bind:title="msg"`

- 简写：`:title="msg"`

  ```html
  <!-- 完整语法 -->
  <a v-bind:href="url"></a>
  <!-- 缩写 -->
  <a :href="url"></a>
  ```

### v-on指令

#### 基本使用

- `v-on:事件名="要执行的代码"`

  ``` jsx
  <button v-on:click="isShow = !isShow">切换显示隐藏</button>
  /* isShow要先定义 */
  ```

- `v-on:事件名="methods中的函数"`

  ```jsx
  <button v-on:click="fn">(不用传参，可以不写括号)</button>
  ```

- `v-on:事件名="methods中的函数(实参)"`

  ```jsx
  <button v-on:click="fn(1, 2)">点击时调用函数并传值</button>
  ```

- **简写：**`v-on:事件名---@事件名`

  ```jsx
  <button @click="isShow = !isShow">切换显示隐藏</button>
  <button @click="fn1">(不用传参，可以不写括号)</button>
  <button @click="fn2(1, 2)">点击时调用函数并传值</button>
  ```

#### vue中获取事件对象

- 没有传参, 通过形参接收 `e`

- 传参了, 通过`$event`指代事件对象` e`

  ```jsx
  <template>
    <div id="app">
      <a @click="fn" href="http://www.baidu.com">去百度</a>
      <a @click="fn2(100, $event)" href="http://www.baidu.com">去百度2</a>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      fn(e) {
        /* 可阻止默认行为 */
        e.preventDefault()
      },
      fn2(num, e) {
        /* 可阻止默认行为 */
        e.preventDefault()
      }
    }
  }
  </script>
  ```

#### v-on 事件修饰符

- **vue**中提供的事件修饰符

- `.prevent `阻止默认行为

- `.stop` 阻止冒泡

- ……

  ```html
  <div id="app">
    <a @click.prevent="fn" href="http://www.baidu.com">去百度</a>
  </div>
  ```

#### 按键修饰符

- `@keyup.enter`  回车

- `@keyup.esc`  返回

- ……

  ```html
  <div id="app">
    <input type="text" @keyup="fn"> <hr>
    <input type="text" @keyup.enter="fn2">
  </div>
  ```

### v-if 和 v-show

> 控制盒子的显示隐藏

#### v-show

- `v-show="布尔值" `   (true显示, false隐藏)
- 实质是在控制元素的 css 样式,  `display: none;`
- 有较高的初始渲染消耗(如果布尔值是false)

#### v-if

- `v-if="布尔值"`   (true显示, false隐藏)
- 实质是在动态的创建 或者 删除元素节点
- 有较高的频繁切换消耗

#### 基本使用

```html
<template>
  <div id="app">
    <h1 v-show="isShow">v-show盒子-{{ msg }}</h1>
    <h1 v-if="isShow">v-if盒子-{{ msg }}</h1>
  </div>
</template>
```

### v-else 和 v-else if

#### 基本使用

```html
<div id="app">
  <h1 v-if="isLogin">尊敬的超级vip, 你好</h1>
  <h1 v-else>你谁呀, 赶紧登陆~</h1>
  
  <h1 v-if="age >= 60">60岁以上, 广场舞</h1>
  <h1 v-else-if="age >= 30">30岁以上, 搓麻将</h1>
  <h1 v-else-if="age >= 20">20岁以上, 蹦迪</h1>
  <h1 v-else>20岁以下, 唱跳rap篮球</h1>
</div>
```

