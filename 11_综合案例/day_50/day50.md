# day50

## 说明
- 核心：接口驱动业务
- 重点：Ajax请求
- 名称：后台数据管理系统

## 使用技术栈

### JQ

- 简化DOM操作，兼容性好

### axios

- 发送ajax请求，简洁轻量

### layui

- 相当Bootstrap，找文档、复制、修改

### 其它插件

## login页面（注册与登录）

### 标签&样式

- html结构

  ```html
  <!-- logo -->
  <div id="logo">
      <img src="./assets/images/logo.png" />
  </div>
  
  <!-- 登录的盒子 -->
  <div id="login">
      <!-- 盒子的标题 -->
      <div class="title"></div>
      <!-- 登录的表单 -->
      <form  class="layui-form">
          <!-- 第一行：用户名 -->
          <div class="layui-form-item">
              <i class="layui-icon layui-icon-username"></i>
              <!-- lay-verify表单验证: 更多参考: https://www.layui.com/doc/modules/form.html -->
              <input type="text" name="username" required lay-verify="required" placeholder="请输入用户名"
                     autocomplete="off" class="layui-input">
          </div>
          <!-- 第二行：密码 -->
          <div class="layui-form-item">
              <i class="layui-icon layui-icon-password"></i>
              <input type="password" name="password" required lay-verify="required" placeholder="请输入密码"
                     autocomplete="off" class="layui-input">
          </div>
          <!-- 第三行：按钮 -->
          <div class="layui-form-item">
              <button class="layui-btn layui-btn-fluid layui-bg-blue" lay-submit>登录</button>
          </div>
          <!-- 第四行：去注册账号 -->
          <div class="layui-form-item">
              <a href="javascript:;" id="goto-register">去注册账号</a>
          </div>
      </form>
  </div>
  
  <!-- 注册的盒子 -->
  <div id="register">
      <!-- 盒子的标题 -->
      <div class="title"></div>
  
      <!-- 注册的表单 -->
      <form class="layui-form">
          <!-- 第一行：用户名 -->
          <div class="layui-form-item">
              <i class="layui-icon layui-icon-username"></i>
              <input type="text" name="username" required lay-verify="required" placeholder="请输入用户名"
                     autocomplete="off" class="layui-input">
          </div>
  
          <!-- 第二行：密码 -->
          <div class="layui-form-item">
              <i class="layui-icon layui-icon-password"></i>
              <input type="password" name="password" required lay-verify="required" placeholder="请输入密码"
                     autocomplete="off" class="layui-input pwd">
          </div>
  
          <!-- 第三行：重复密码 -->
          <div class="layui-form-item">
              <i class="layui-icon layui-icon-password"></i>
              <input type="password" required lay-verify="required" placeholder="请再次输入密码"
                     autocomplete="off" class="layui-input">
          </div>
  
          <!-- 第四行：按钮 -->
          <div class="layui-form-item">
              <button class="layui-btn layui-btn-fluid layui-bg-blue" lay-submit>注册</button>
          </div>
          <!-- 第五行：有账号，去登录 -->
          <div class="layui-form-item">
              <a href="javascript:;" id="goto-login">已有账号，去登录</a>
          </div>
      </form>
  </div>
  ```

- layui.css

  - [Layui](https://www.layui.com/)

- login.css

  ```css
  html,
  body {
    height: 100%;
    background: url('../assets/images/login_bg.jpg') no-repeat;
    background-size: cover;
    overflow: hidden;
    /* 去掉滚动条 */
  }
  
  
  /* logo */
  #logo {
    margin: 20px 0 0 130px;
  }
  
  
  /* 登录和注册的盒子 */
  #login,
  #register {
    height: 310px;
    width: 400px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  
  /* 先让注册的盒子隐藏 */
  #register {
    display: none;
  }
  
  .title {
    /* ../   ./  相对当前文件找路径*/
    /* /   绝对路径，找根路径 */
    height: 60px;
    background: url('../assets/images/login_title.png') no-repeat center;
  }
  
  
  /* 表单 */
  .layui-form {
    margin: 0 30px;
  }
  
  #goto-register,
  #goto-login {
    float: right;
  }
  
  
  /* 字体图标 */
  .layui-form-item {
    position: relative;
  }
  
  .layui-icon {
    position: absolute;
    top: 10px;
    left: 5px;
  }
  
  .layui-input {
    padding-left: 25px;
  }
  ```

### 注册与登录的按需显示

- Jquery.js

- login.js

  ```js
  /**
  * 1. 注册/登录 表单 切换
  */
  $("#goto-register").on("click", () => {
      $("#register").stop().show();
  })
  $("#goto-login").on("click", () => {
      $("#register").stop().hide();
  })
  ```

### 注册与登录---表单校验

- layui.js

  ```js
  const { form } = window.layui
  // 引用layui.js后, 有layui对象(类似于$), 然后拿到内部的form对象(用来管理所有用layui创建的表单-以及使用了lay-veify属性的标签)
  
  form.verify({ // 指定规则名和对应的验证规则
      usern: [ // 用户名
          /^[a-z0-9]{6,10}$/,
          '账号名是6到10位由数字, 小写字母组成'
      ],
      pwd: [ // 密码
          /^[\S]{6,10}$/,
          '密码是6到10位, 不能有空格'
      ],
      // 注册页-确认密码
      repwd: function (value) { // 为什么用函数, 因为不光要获取这个规则对应的标签的值, 还需要用jQ获取另外一个标签的值
          return ($(".pwd").val() !== value) && '两次密码不相同'
      },
  })
  ```

### 注册---提交请求

- 1、阻止默认提交行为

- 2、获取表单数据

  - username

  - password

  - 可用对象管理

    ```js
    const data = {
        username: 用户名数据,
        password: 密码数据
    }
    ```

- 3、发送ajax请求

  - axios.js

- 4、处理响应res

  - 注册成功，提示，显示登录框

```js
$("#register .layui-form").on("submit", ev => {
    ev.preventDefault();
    let data = {
        username: $("#register input[name=username]").val(),
        password: $("#register input[name=password]").val()
    }
    
    // 后台要key=value&key=value字符串
    let arr = [];
    for (var k in data) {
        arr.push(`${k}=${data[k]}`);
    }
    let argStr = arr.join("&");
    
    axios.post(
        url: "http://123.57.109.30:3007/api/reguser",argStr
    ).then(res => {
        console.log(res);
        // 显示登录页面 - 让用户登录
        $("#register").stop().hide();
    });
})
```

### 登录

- 实现原理同上述**注册**
  - 1、阻止默认提交行为
  - 2、获取表单数据
  - 3、发送ajax请求
  - 4、处理响应res
    - 登录成功，提示，页面跳转

```js
$("#login .layui-form").on("submit", ev => {
    ev.preventDefault();
    let data = {
        username: $("#login input[name=username]").val(),
        password: md5($("#login input[name=password]").val())
    }
    
    // 后台要key=value&key=value字符串
    let arr = [];
    for (var k in data) {
        arr.push(`${k}=${data[k]}`);
    }
    let argStr = arr.join("&");
    
    axios(
         "http://123.57.109.30:3007/api/login",argStr
    ).then(res => {
        console.log(res);
        // 登录成功跳转到首页
        window.location.href = "./index.html";
    });
})
```

