// 表单校验
// 从layui对象中解构出form


/* 注册校验 */
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
    // 密码
    password: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    // 确认密码
    confirm: function (value) {
        // &&--逻辑与实现短路操作，表达式1&&表达式2，表达式1成立则输出表达式2，否则输出false
        return value !== $('.pwd').val() && "两次输入密码不一致"
    },

    // 昵称&网页修改
    nickname: [
        /^[\u4E00-\u9FA5]+$/,
        '昵称只能是中文'
    ],
    email: [
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        '请输入正确邮箱'
    ],

    // 修改密码验证 - 刚加的验证
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
    diff: function (value) {
        return ($(".oldPwd").val() == value) && "新密码和旧密码不能一样"
    },
    // 修改密码页 - 使用
    same: function (value) {
        return ($(".newPwd").val() !== value) && '两次密码不相同'
    }
});

