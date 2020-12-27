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
- layui.css
  - [Layui](https://www.layui.com/)
- login.css

### 注册与登录的按需显示

- Jquery.js
- login.js7

### 注册与登录---表单校验

- layui.js

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

### 登录

- 实现原理同上述**注册**
  - 1、阻止默认提交行为
  - 2、获取表单数据
  - 3、发送ajax请求
  - 4、处理响应res
    - 登录成功，提示，页面跳转





