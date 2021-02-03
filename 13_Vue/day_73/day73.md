# day73

## SPA - 单页应用程序

> SPA： `Single Page Application`  单页面应用程序
>
> MPA : `Multiple Page Application`多页面应用程序 

### 优势

- 传统的多页面应用程序，每次请求服务器返回的都是一整个完整的页面
- 单页面应用程序只有第一次会加载完整的页面
- 以后每次请求仅仅获取必要的数据，减少了请求体积，加快页面响应速度，降低了对服务器的压力
- SPA更好的用户体验，运行更加流畅

### 缺点

1. 开发成本高 (需要学习路由)  `vue-router   react-router`
2. **不利于 SEO** 搜索引擎优化    谷歌浏览器在解决这个问题    ssr:服务端渲染 server side rendering

## 前端路由

> 浏览器 **URL 中的哈希值**( # hash) 与 **展示视图内容(组件)** 之间的对应规则
>
> - 简单来说,路由就是一套映射规则(一对一的对应规则), 由开发人员制定规则.- 
> - 当 URL 中的哈希值( `#` hash) 发生改变后,路由会根据制定好的**规则**, 展示对应的视图内容(组件)
>
> **vue 中的路由** : 是 **hash** 和 **component** 的对应关系, **一个哈希值对应一个组件**

### 工作模式

- 用户点击了页面上的路由链接
- 导致了 URL 地址栏中的 Hash 值发生了变化
- 前端路由监听了到 Hash 地址的变化
- 前端路由把当前 Hash 地址对应的组件渲染都浏览器中

### [vue-router](<https://router.vuejs.org/zh/>)

- 安装

  ```bash
  yarn add vue-router
  ```

+ 导入路由

  ```jsx
  import VueRouter from 'vue-router'
  ```

+ 使用路由插件

  ```js
  // 在vue中，使用使用vue的插件，都需要调用Vue.use()
  Vue.use(VueRouter)
  ```

+ 创建路由对象

  ```js
  const router = new VueRouter()
  ```

+ 关联到vue实例

  ```js
  new Vue({
    router
  })
  ```

#### 配置路由规则

```jsx
const router = new VueRouter({
  routes: [
    // 一条规则 path: 路由，锚点值  component 组件
    { path: '/home', component: Home },
    { path: '/music', component: Music },
    { path: '/friend', component: Friend },
  ]
})
```

- 配置了规则，一定要指定路由的出口 

  ```jsx
  <!-- 路由的出口，，可以理解为 component -->
  <router-view></router-view>
  ```

#### 导航链接

> 可以通过a链接或者通过vue-router提供的 router-link标签指定导航链接

```jsx
<!-- vue-router提供了一个组件 router-link: 作用用于提供路由链接 -->
<!-- router-link实质上最终会渲染成a链接 to属性等价于提供 href属性-->
<!-- router-link提供了导航链接高亮的功能 -->
<ul>
  <li><a href="#/home">首页</a></li>
  <li><a href="#/music">音乐</a></li>
  <li><a href="#/friend">朋友</a></li>
</ul>

<ul>
  <li><router-link to="/home">首页</router-link></li>
  <li><router-link to="/music">音乐</router-link></li>
  <li><router-link to="/friend">朋友</router-link></li>
</ul>
```

> 推荐使用router-link实现导航链接，因为router-link会自动增加两个类名 router-link-active   router-link-exact-active，通过这两个类名就可以实现当前当行高亮。

#### 嵌套路由

```jsx
const router = new VueRouter({
  routes: [
    { path: '/user', 
      component: Home,
     children:[
         {path: '/login', component: Login}
     ]
    },
  ]
})
```

#### 编程式导航

> 声明式导航 通过`router-link`就可以 
>
> 编程式导航  通过js代码实现路由的跳转，就叫编程式导航` router.push()`

