/* 登录
    1、“去注册帐号”单击切换
        单击文字，“注册盒子”显示
    2、登录表单提交 */

// 1、“去注册帐号”单击切换
$('#goto-register').click(() => {
    $('#register').stop().show()
})
// 2、登录表单提交
$('#login .layui-form').on('submit', e => {
    // 阻止表单默认跳转
    e.preventDefault()
    const req = $(e.target).serialize()
    postUserLogin(req, res => {
        const { token } = res.data
        // 登录成功保存token到本地
        localStorage.setItem('token', token)
        // 登录成功跳转页面
        window.location.href = './index.html'
    })
})


/* 注册
    1、“已有帐号，去登陆”单击返回登录
        单击文字，“注册盒子”隐藏
    2、注册表单提交 */

// 1、“已有帐号，去登陆”单击返回登录
$('#goto-login').click(() => {
    $('#register').stop().hide()
})


// 2、注册表单提交
$('#register .layui-form').on('submit', e => {
    // 阻止表单默认跳转
    e.preventDefault()
    const req = $(e.target).serialize()
    postUserRegister(req, res => {
        $('#register').stop().hide()
        $(e.target).find('input').val('')
    })
})



