// 显示帐号、昵称、邮箱
getInfoUser((res) => {
    const { username, nickname, email, id } = res.data.data
    $('.layui-form input[name=id]').val(id)
    $('.layui-form input[name=username]').val(username)
    $('.layui-form input[name=email]').val(email)
    $('.layui-form input[name=nickname]').val(nickname)

    // 重置按钮
    // 把上面用户的信息, 重新铺设一遍
    $(".my-reset").on("click", (ev) => {
        ev.preventDefault()
        $(".layui-form input[name=nickname]").val(nickname)
        $(".layui-form input[name=email]").val(email)
    })
})

// 表单提交
$(".layui-form").on("submit", e => {
    // 阻止默认提交事件
    e.preventDefault();
    // 数据获取，修改发送格式
    const data = $(".layui-form").serialize()
    postUserInfo(data, res => {
        window.parent.getUserInfo()
    })
})





