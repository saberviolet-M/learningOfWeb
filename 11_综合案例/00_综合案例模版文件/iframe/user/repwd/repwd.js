// 提交表单
$('.layui-form').on('submit', (e) => {
    e.preventDefault();
    const data = $(".layui-form").serialize()
    postChangePassword(data, res => {
        const { status } = res.data
        if (status === 0) {
            setTimeout(() => {
                localStorage.removeItem('token')
                window.parent.location.href = '../../../../day_52/阶段代码/login.html'
            }, 500);
        }
    })
})

// 重置按钮
$('.layui-form .layui-input-block .layui-btn-primary').click(() => {
    $('.layui-form input').val('')
})