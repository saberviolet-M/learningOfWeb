# day67

## 过滤器

> `过滤器（Filters）`是 vue 为开发者提供的功能，常用于文本的格式化。
>
> 过滤器可以用在两个地方：`插值表达式`和 `v-bind 属性绑定`。

过滤器由“管道符”`|`进行调用，示例代码如下：

```jsx
<!-- 通过过滤器对message进行过滤 -->
<p>{{message | 过滤器}}</p>

<!-- 通过过滤器对title进行过滤 -->
<div :title="title | 过滤器"></div>
```

### 定义过滤器

- `局部过滤器(filters)`: 组件私有的过滤器，可以在 filters 节点中定义过滤器，该过滤器只能在当前组件中调用

  ```jsx
  export default {
    /* 
      filters: {
        过滤器名字 (过滤的值) {
          return 处理后的值
        }
      }
    */
    filters: {
      upper (input) {
        return input.slice(0, 1).toUpperCase() + input.slice(1)
      }
    }
  }
  ```

- `全局过滤器(filter)`： 如果希望在多个 vue 组件之间共享过滤器，可以通过`Vue.filter()`方法定义全局过滤器

  ```jsx
  // 参数1： 过滤器名称
  // 参数2： 过滤器函数，处理过滤逻辑
  // 必须在Vue实例创建之前定义
  Vue.filter('upper', function (input) {
    return input.slice(0, 1).toUpperCase() + input.slice(1)
  })
  ```

### 调用多个过滤器

> 过滤器可以串联地进行调用

```jsx
<template>
  <!-- 把msg的值，交给filterA进行处理 -->
  <!-- 把filterA处理的结果，再交给filterB进行处理 -->
  <!-- 最终把filterB处理，把最终的值渲染到页面 -->
  <div>{{msg | filterA | filterB}}</div>
</template>
```

### 过滤器传参

```jsx
// 使用过滤器的时候可以传递额外的参数
<p>{{msg | filterA(arg1, arg2)}}</p>

// 定义过滤器的时候，需要接收额外的参数
filters: {
  // 建议给过滤器的额外参数提供默认值
  filterA (input, arg1 = 0, arg2 = 1) {
    
  }
}
```

## 计算属性

> 计算**属性**是一个 **function**，这个 **function** 的返回值就是计算属性最终的值。
>
> - 计算属性必须定义在 **computed** 节点中
> - 定义名称不能与`data`中变量名相同
>
> - 计算属性必须是一个 **function**,计算属性**必须有返回值**
>
> - 计算属性**不能**被当作`方法调用`,**必须**当成`属性来用`

- **什么时候会用到计算属性**

  - 在模板中书写大量的js逻辑，模板会变得不好维护，把这段逻辑写到计算属性中

  - 我们需要一个属性，但是这个属性不是立马得到的，需要通过逻辑运算才能得到

- 定义计算属性

  ```js
  export default {
    // 组件的数据： 需要计算的属性
    computed: {
      reverseMsg() {
        return this.msg.split("").reverse().join("");
      },
    },
  }
  ```

- 使用计算属性

  ```jsx
  <p>{{ reverseMsg }}</p>
  ```

### 计算属性的缓存的问题

> 计算属性只要计算了一次，就会把结果缓存起来，以后多次使用计算属性，直接使用缓存的结果，只会计算一次。
>
> 计算属性依赖的属性一旦发生了改变，计算属性会重新计算一次，并且缓存。

### 计算属性的完整写法

```jsx
// 1. 计算属性默认情况下只能获取，不能修改。
// 2. 计算属性的完整写法
/* 
  computed: {
    full() {},
    full: {
      get() {
        return this.first + ' ' + this.last
      },
      set(value) {

      }
    }
  }
*/
computed: {
  full: {
    get () {
      return this.first + ' ' + this.last
    },
    set (value) {
      console.log('修改了计算属性', value)
      this.first = value.split(' ')[0]
      this.last = value.split(' ')[1]
    }
  }
}
```

## 属性监听

#### 基本使用

> 当需要监听某个数据是否发生改变，就要用到watch

```jsx
/* 
  watch: {
    // 只要属性发生了改变，这个函数就会执行
    属性: function () {

    }
  }
*/
watch: {
  // 参数1： value    变化后的值
  // 参数2： oldValue 变化前的值
  msg (value, oldValue) {
    console.log('你变了', value, oldValue)
  }
}
```

### 复杂类型的监听-监听的完整写法

> 如果监听的是复杂数据类型，需要深度监听，需要指定deep为true,需要用到监听的完整的写法

```jsx
// 1. 默认情况下，watch只能监听到简单类型的数据变化,如果监听的是复杂类型，只会监听地址是否发生改变，不会监听对象内部属性的变化。
// 2. 需要使用监听的完整写法 是一个对象
watch: {
  // friend (value) {
  //   console.log('你变了', value)
  // }
  friend: {
    // handler 数据发生变化，需要执行的处理程序
    // deep: true  如果true,代表深度监听，不仅会监听地址的变化，还会监听对象内部属性的变化
    // immediate: 立即 立刻  是否立即监听 默认是false  如果是true,代表页面一加载，会先执行一次处理程序
    handler (value) {
      console.log('你变了', value)
    },
    deep: true,
    immediate: true
  }
},
```

