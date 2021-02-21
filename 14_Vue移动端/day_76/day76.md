# day76

## vuex（初）

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**

### 核心概念

#### State

> State提供唯一的公共数据源，所有共享的数据都要统一放到Store中的State中存储

- `@/store/index.js`

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  Vue.use(Vuex)
  
  export default new Vuex.Store({
    state: {
      // 用法类似data,但是具备唯一性
        count:101
    },
      ...
  })
  ```

##### 使用方法

- 差值表达式

  ```js
  {{$store.state.count}}
  ```

- 计算属性

  ```js
  computed: {
     count () {
       return this.$store.state.count
     }
  }
  ```

- 辅助函数  - **mapState**

  ```js
  import { mapState } from 'vuex'
  
  computed: {
      其它计算属性,
     ...mapState(['count']) 
  }
  ```

#### mutations

> **state数据的修改只能通过mutations，并且mutations必须是同步的**

- `@/store/index.js`

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  Vue.use(Vuex)
  
  export default new Vuex.Store({
   ...
    mutations: {
      // 固有参数用于修改state中数据，后可跟其它参数 
      addCount (state[,...]) {
        
      }
    },
  ...
  })
  ```

##### 使用方法

- 位于**methods**

  ```js
  methods: {
    fn () {
      this.$store.commit('addCount'[,...])// 可传递其它参数,多参数可以传递对象
  	/*
  	this.$store.commit('inputCount', {
  	  count: e.target.value
  	})
  	*/
    }
  }
  ```

- 辅助函数 - **mapMutations**

  ```js
  import  { mapMutations } from 'vuex'
  methods: {
      其它方法,
      ...mapMutations(['addCount'])
  }
  ```

#### actions

> state是存放数据的，mutations是同步更新数据 (便于监测数据的变化, 更新视图等, 方便于调试工具查看变化)，
>
> actions则负责进行异步操作

- `@/store/index.js`

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  Vue.use(Vuex)
  
  export default new Vuex.Store({
    ...
    actions: {
        setAsyncCount (context, num) {
      	// 一秒后, 给一个数, 去修改 num
        	setTimeout(() => {
          	context.commit('inputCount', num)
        	}, 1000)
        }
    },
    ...
  })
  
  ```

#####使用方法 

- 位于**methods**

  ```js
  methods: {
   	setAsyncCount () {
    		this.$store.dispatch('setAsyncCount', 200)
  	}
  }
  ```

- 辅助函数 - **mapActions**

  ```js
  import { mapActions } from 'vuex'
  methods: {
      其它方法,
      ...mapActions(['setAsyncCount'])
  }
  ```

  