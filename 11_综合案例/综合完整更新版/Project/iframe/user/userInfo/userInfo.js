//展示信息
getUserInfo(res => {
    const { id, nickname, email, username } = res.data.data
    $('.layui-form input[name=username]').val(username)
    $('.layui-form input[name=nickname]').val(nickname)
    $('.layui-form input[name=email]').val(email)
    $('.layui-form input[name=id]').val(id)

    // 重置按钮
    $('.my-reset').click(e => {
        e.preventDefault()
        $('.layui-form input[name=nickname]').val(nickname)
        $('.layui-form input[name=email]').val(email)
    })
})

// 表单提交
$('.layui-form').on('submit', e => {
    // 阻止默认跳转
    e.preventDefault()
    const req = $(e.target).serialize()
    postUserInfo(req, res => {
        window.parent.loadUserInfo()
    })
})

