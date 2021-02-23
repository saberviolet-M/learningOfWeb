# day77

## vuex核心概念

### getters

> 基于**state**获取派生状态，**相当于计算属性**

```js
export default new Vuex.Store({
    state:{
        list:[1,2,3,4,5,6]
    }
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

