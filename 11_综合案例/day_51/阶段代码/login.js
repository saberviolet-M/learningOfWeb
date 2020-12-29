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

    // 表单校验
    // 从layui对象中解构出form
    const { form, layer } = window.layui;
    form.verify({
        // 用户名
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{6,10}$").test(value)) {
                return '账号名是6到10位由数字, 小写字母组成，不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        // 密码
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码
        confirm: function (value) {
            // &&--逻辑与实现短路操作，表达式1&&表达式2，表达式1成立则输出表达式2，否则输出false
            return value !== $('.pwd').val() && "两次输入密码不一致"
        }
    });

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