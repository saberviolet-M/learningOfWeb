// JQ入口函数
$(function () {
    // 登录窗口转注册窗口
    $('#goto-register').click(() => {
        $('#register').stop().show();
    })
    // 注册窗口转登录窗口
    $('#goto-login').click(() => {
        $('#register').stop().hide();
    })

    // 注册表单发送校验---http://ajax.frontend.itheima.net/api/reguser
    // 后台要key=value&key=value字符串
    $('#register .layui-form').on('submit', (e) => {
        // 清除表单默认跳转事件
        e.preventDefault();
        const data = {
            username: $('#register input[name=username]').val(),
            password: $('#register input[name=password]').val()
        };
        // getObjectToString(data),在11_综合案例/common/utils.js中封装
        const dataStr = getObjectToString(data);
        postRegUser(dataStr, function (res) {
            $('#register').stop().hide();
        });

    });

    // 登录表单发送校验---http://ajax.frontend.itheima.net/api/login
    // 后台要key=value&key=value字符串
    $('#login .layui-form').on('submit', (e) => {
        // 清除表单默认跳转事件
        e.preventDefault();
        const data = {
            username: $('#login input[name=username]').val(),
            password: $('#login input[name=password]').val()
        };
        // getObjectToString(data),在11_综合案例/common/utils.js中封装
        const dataStr = getObjectToString(data);
        postLogin(dataStr, function (res) {
            window.location.href = './index.html';
        });
    });
})