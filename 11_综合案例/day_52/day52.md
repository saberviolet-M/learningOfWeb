# day52

## 基本资料页面（userInfo）

### 渲染信息

### 验证和获取表单数据

### 确认修改

### 自动刷新页面

### 重置按钮

### 更新信息

## 密码重置页面（repwd）

### 表单认证

```js
// 修改密码验证 - 刚加的验证
let form = layui.form;

form.verify({
    usern: [ // 用户名
        /^[a-z0-9]{6,10}$/,
        '账号名是6到10位由数字, 小写字母组成'
    ],
    pwd: [ // 密码
        /^[\S]{6,10}$/,
        '密码是6到10位, 不能有空格'
    ],
    // 注册页-确认密码
    repwd: function (value) {
        return ($(".pwd").val() !== value) && '两次密码不相同'
    },
    nickn: [ // 昵称
        /^[\u4E00-\u9FA5]+$/,
        '昵称只能是中文'
    ],

    // 修改密码页面使用 - 新旧密码不能一样
    diff: function(value){
        return ($(".oldPwd").val() == value) && "新密码和旧密码不能一样"
    },
    // 修改密码页 - 使用
    same: function(value) {
        return ($(".newPwd").val() !== value) && '两次密码不相同'
    }
})
```

- **封装模块**
  - **common/verify.js**---抽取代码，专门处理表单认证规则

## 更换头像页面（ avatar）

### 插件配置

> 找插件 - 下插件 - 引插件 - 用插件 - 改配置

- 引入cropper.css
- 引入jQuery.js  (因为这个cropper插件里面代码都用jQuery.js写的)
- 引入 cropper.js
- 引入jquery-cropper.js

```js
// 1. 初始化裁剪插件
var cropper = new Cropper($("#image")[0], {
    aspectRatio: 1, // 裁剪图层的横纵比例
    preview: $(".img-preview") // 裁剪预览位置
});
```

### 上传按钮处理

### 图片预览（回显图片）

### 确认按钮-发送请求

### 确认按钮-更新页面

