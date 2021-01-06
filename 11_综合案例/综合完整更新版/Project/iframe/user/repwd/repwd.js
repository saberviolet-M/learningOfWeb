// 输入密码表单提交
$('.layui-form').on('submit', e => {
    e.preventDefault()
    const req = $(e.target).serialize()
    postUserInfo(req, res => {
        setTimeout(() => {
            localStorage.removeItem('token')
            window.parent.location.href = '../../../login.html'
        }, 500)
    })
})