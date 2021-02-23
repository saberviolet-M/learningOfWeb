# day77

## vuex核心概念

### getters

> 基于**state**获取派生状态，**相当于计算属性**

```js
export default new Vuex.Store({
    state:{
        list:[1,2,3,4,5,6]
    },
    getters:{
        // 形式为函数，必须含有return
        listLength(state){
            return state.list.length
        }
    }
})
```

#### 使用

```vue
<template>
  <div id="app">
    <!-- 差值表达式 -->
	{{$state.getters.listLength}}
  </div>
</template>
```

```vue
<template>
  <div id="app">
	{{ listLength }}
  </div>
</template>
<script>
// 辅助函数
import { mapGetters } form 'vuex'
export default{
	computed:{
 	   ...mapGetters(['listLength'])
	}
}
</script>
```

### module

> 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。
>
> 当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
>
> 由此，有了Vuex的模块化。

![module](./media/module.png)

#### 模块抽离（例）

- **src/store/modules/userInfo.js(抽离)**

  ```js
  const state = {
    name: 'lily',
    age: 18,
    sex: 'female'
  }
  
  const mutations = {}
  
  const actions = {}
  
  const getters = {}
  
  // 导出
  export default {
    state,
    mutations,
    actions,
    getters
  }
  ```

- **src/store/index.js（挂载）**

  ```js
  import userInfo from './modules/userInfo'
  export default new Vuex.Store({
    ...
    modules: {
      userInfo
    }
  })
  ```

#### 命名空间namespace

> 默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的

![namespace](./media/namespace.png)

- **src/store/modules/userInfo.js**

  ```js
  export default {
    namespaced: true,// 开启命名空间
    state,
    mutations,
    actions,
    getters
  }
  ```

- **提交模块中的mutation**

  ```js
  全局的:   this.$store.commit('mutation函数名', 参数)
  
  模块中的: this.$store.commit('模块名/mutation函数名', 参数)
  ```

- **提交模块中的action**

  ```js
  全局的:   this.$store.dispatch('action函数名', 参数)
  
  模块中的: this.$store.dispatch('模块名/action函数名', 参数)
  ```

- **映射**

  ```js
  computed: {
    // 全局的
    ...mapState(['数据字段']),
    // 模块中的
    ...mapState('模块名', ['数据字段']),
  },
  methods: {
    // 全局的
    ...mapMutations(['方法名'])
    // 模块中的
    ...mapMutations('模块名', ['方法名'])
  }
  ```