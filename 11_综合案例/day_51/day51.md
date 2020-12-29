# day51

## 封装模块

- 业务文件和数据请求分离

  > 业务文件只使用数据，不关心数据如何获得

- **utils.js**---业务辅助函数的文件（约定俗成的名称）

### 回调函数（callback）

> **说明**：
>
> - 函数A的形参是函数B
>
> **功能**：
>
> - 解决异步外获取异步内部产生的结果
>
> **异步操作**：
>
> - 定时器/ajax/事件

- **api.js**---项目请求方法的文件（约定俗成的名称）

  - 当遇到 异步操作（定时器/ajax/事件时），在结果出现的位置调用**形参**函数，可将结果传递到外部

    ```js
    function fn1(fn2){
        let a = 10
        setTimeout(()=>{
            a++
            fn2(a)
        },1000)
    }
    fn1(function(x){
        console.log('x=>',x)
    })
    ```

    ![callback](D:\1_2020Web\Note\11_综合案例\day_51\media\callback.jpg)

### 注册&登录请求封装

```js
/*
*函数名：postRegUser
*函数作用：发送post请求注册用户
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const postRegUser = (dataStr, cb) => {
    axios.post("http://ajax.frontend.itheima.net/api/reguser", dataStr)
        .then(res => {
            if (res.data.status === 0) {
                cb(res)
            }
            layer.msg(res.data.message);
        })
}

/*
*函数名：postLogin
*函数作用：发送post请求用户登录
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const postLogin = (dataStr, cb) => {
    axios.post("http://ajax.frontend.itheima.net/api/login", dataStr)
        .then(res => {
            if (res.data.status === 0) {
                // 弹层组件文档 - layui.layer
                cb(res)
            }
            layer.msg(res.data.message);
        })
}
```

### axios配置---baseURL

```js
axios.defaults.baseURLl = '基地址';//axios方法，自动添加在请求的url之前
```

### axios配置---响应拦截器

> 在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // （本案例）处理res响应结果=>if status || 弹窗
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
```

##  登录---安全验证---token存储

> token和正确用户是唯一绑定的
>
> localStorage
>
> - 永久保存数据（数据持久化处理）
>
> 存储位置（查看）
>
> - F12=>Application=>localStorage

```js
window.localStorage.setItem('key名',value-要保存的数据)
//window.localStorage.setItem('token',token)
```

## 主页（index）

### 标签&样式

- html

  ```html
  <body class="layui-layout-body">
      <div class="layui-layout layui-layout-admin">
          <!-- 头部区域 -->
          <div class="layui-header">
              <!-- 左侧：图片 -->
              <div class="layui-logo">
                  <img src="./assets/images/logo.png" alt="">
              </div>
              <!-- 右侧：个人菜单 -->
              <ul class="layui-nav layui-layout-right">
                  <li class="layui-nav-item">
                      <a href="javascript:;" class="userinfo">
                          <span class="avatar">L</span>
                          <img src="./assets/images/sample.jpg" class="layui-nav-img"> 个人中心
                      </a>
  
                      <dl class="layui-nav-child">
                          <dd><a href="./iframe/user/userInfo/userInfo.html" target='fm'>基本资料</a></dd>
                          <dd><a target='fm' href="./iframe/user/avatar/avatar.html">更换头像</a></dd>
                          <dd><a target="fm" href="./iframe/user/repwd/repwd.html">重置密码</a></dd>
                      </dl>
                  </li>
  
                  <li class="layui-nav-item">
                      <a href="javascript:;" id="logout">
                          <i class="layui-icon layui-icon-logout"></i>退出
                      </a>
                  </li>
              </ul>
          </div>
  
          <div class="layui-side layui-bg-black">
              <div class="layui-side-scroll">
                  <!-- 左侧：顶部欢迎词 -->
                  <div class="userinfo">
                      <span class="avatar">L</span>
                      <img src="./assets/images/sample.jpg" class="layui-nav-img"> 欢迎你
                      <span class="username"></span>
                  </div>
  
                  <!-- 左侧：导航区-->
                  <!-- lay-shrink: 控制兄弟菜单, all就是所有兄弟都合上, 同一个时间只有一个下拉菜单才能下拉 -->
                  <ul class="left-nav layui-nav layui-nav-tree" lay-filter="test" lay-shrink="all">
                      <!-- **********************首页***************************** -->
                      <!-- layui-this 默认上来高亮的样式 -->
                      <li class="layui-nav-item layui-this">
                          <a href="./iframe/home/home.html" target="fm">
                              <i class="layui-icon layui-icon-home"></i>可视数据
                          </a>
                      </li>
  
                      <!-- *******文章管理******* -->
                      <li class="layui-nav-item">
  
                          <a class="" href="javascript:;">
                              <i class="layui-icon layui-icon-form"></i>文章管理
                          </a>
  
                          <dl class="layui-nav-child">
                              <dd>
                                  <a href="./iframe/article/category/category.html" target="fm">
                                      <i class="layui-icon layui-icon-app"></i>类别管理
                                  </a>
                              </dd>
  
  
                              <dd id="wzlist">
                                  <a href="./iframe/article/list/list.html" target="fm">
                                      <i class="layui-icon layui-icon-app"></i>文章列表
                                  </a>
                              </dd>
  
  
                              <dd>
                                  <a href="./iframe/article/publisher/publisher.html" target="fm">
                                      <i class="layui-icon layui-icon-app"></i>发表文章
                                  </a>
                              </dd>
                          </dl>
                      </li>
  
                      <!-- **************个人中心************** -->
                      <li class="layui-nav-item">
  
                          <a href="javascript:;">
                              <i class="layui-icon layui-icon-user"></i>个人中心
                          </a>
  
                          <dl class="layui-nav-child">
  
                              <dd>
                                  <a href="./iframe/user/userInfo/userInfo.html" target="fm">
                                      <i class="layui-icon layui-icon-app"></i>基本资料
                                  </a>
                              </dd>
  
                              <dd>
                                  <a href="./iframe/user/repwd/repwd.html" target="fm">
                                      <i class="layui-icon layui-icon-app"></i>重置密码
                                  </a>
                              </dd>
  
                              <dd>
                                  <a href="./iframe/user/avatar/avatar.html" target="fm">
                                      <i class="layui-icon layui-icon-app"></i>更换头像
                                  </a>
                              </dd>
                          </dl>
                      </li>
  
                  </ul>
              </div>
          </div>
  
          <div class="layui-body">
              <!-- 内容主体区域 -->
              <!-- <div style="padding: 15px;">内容主体区域</div> -->
              <iframe src="./iframe/home/home.html" name="fm" frameborder="0"></iframe>
          </div>
  
          <div class="layui-footer">
              <!-- 底部固定区域 -->
              © layui.com - 底部固定区域
          </div>
      </div>
  </body>
  ```

- layui.css

- index.css

  ```css
  .layui-icon {
    margin-right: 8px;
    font-size: 16px;
  }
  
  .layui-icon-app {
    margin-left: 20px;
  }
  
  iframe {
    width: 100%;
    height: 100%;
  }
  
  
  /* 给iframe的父元素加 overlow: hidden，目的是去掉一个滚动条 */
  .layui-body {
    overflow: hidden;
  }
  
  
  /* 侧边栏头像 */
  div.userinfo {
    line-height: 60px;
    text-align: center;
  }
  
  
  /* 字体头像 */
  .avatar {
    display: inline-block;
    width: 32px;
    height: 32px;
    background-color: #419488;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
  }
  
  
  /*开始让两个头像都隐藏*/
  .userinfo img,
  .userinfo .avatar {
    display: none;
  }
  ```

### 行为

- layui.js---配合layui.css的交互效果
- jquery.js
- utils.js
- axios.js
- api.js

- index.js

### iframe---双标签

> 在当前网页（html）内部嵌套网页（html）

- **src**---嵌套的网页的**pathname**（路径）
- **name**---为**a链接**跳转找到**位置**显示html页面而进行命名
- **frameborder**---iframe容器的边框

###  登录---安全验证---token

> 判断token，是否显示**index**页面

```js
if(!window.localStorage.getItem('token')){
    window.location.href = '登录页面的pathname（路径名）'
}
```

### ‘个人中心’-数据请求-api和headers

```js
const { layer } = window.layui
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //console.log('请求拦截器------', config) // headers
    // config.url
    // TODO====================================
    //  if(如果拦截到的请求不是登录和注册){
    const AUTH_TOKEN = window.localStorage.getItem('token')
    config.headers['Authorization'] = AUTH_TOKEN
    //  }
    // config.headers.Authorization = AUTH_TOKEN;
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
```

### 用户信息渲染

```js
// 获取登录用户的数据
getInfoUser((res) => {
  let {nickname, user_pic, username } = res.data.data
  // nickname  user_pic (null) username(')
  if (nickname === '') {
    nickname = username
  }
  // 绘制用户名
  $('.username').text(nickname)
  $('.avatar').css('display', 'inline-block')
  // 如果没上传图片 显示用户名的首字母大写
  if (user_pic === null) {
    const firstLetter = nickname[0].toUpperCase()
    $('.avatar').text(firstLetter)
  } else {
    // 如果,直接img的src
    // TODO===========上传图片完毕后===测试!!!
    $('.layui-nav-img').attr('src', user_pic)
  }
})
```

### axios配置---统一设置请求头

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // （本案例）设置请求头
    const AUTH_TOKEN = window.localStorage.getItem('token');
    config.headers['Authorization']= AUTH_TOKEN;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
```

### JWT-token使用（JSON Web Token）

> 是一种代替密码的鉴权字符串技术（服务器只负责办法**jwt**字符串，不负责存储）

### axios配置-token失效处理

```js
// 添加响应拦截器
// .then之前
axios.interceptors.response.use(
  function (response) {
    // response=>res
    // console.log('res的拦截器进来了-----------',response)
    // ?? 处理所有请求对应的res结果=>  if status  弹窗
    const { status, message } = response.data
    layer.msg(message)
    if (status === 0) {
      // console.log('token没失效 正确的可用res');
    }
    if (status === 1) {
      window.localStorage.removeItem('token')
      window.location.href = '/login.html'
    }
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
```

### 退出

> 1、确认框（确认不是误操作）
>
> 2、删除token
>
> 3、页面跳转（回到登录页面）

```js
// 退出
$('#logout').on('click', () => {
  // 确认框
  layer.confirm(
    '退出嘛?',
    { icon: 3, title: '提示' },
    () => {
      //    移除token
      window.localStorage.removeItem('token')
      //  去login
      window.location.href = '/login.html'
    }
  )
})
```

