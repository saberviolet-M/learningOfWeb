// 校验token
if (!localStorage.getItem('token')) {
    location.href = './login.html'
}

// 获取登录用户的数据
const getUserInfo = () => {
    getInfoUser((res) => {
        let { nickname, user_pic, username } = res.data.data

        if (nickname === '') {
            nickname = username
        }
        // 绘制用户名
        $('.username').text(nickname)
        $('.avatar').css('display', 'inline-block')

        // 如果没上传图片 显示用户名的首字母大写
        if (user_pic === null) {
            const firstLetter = nickname[0].toUpperCase()
            $('.avatar').text(firstLetter)
        } else {
            $('.layui-nav-img').attr('src', user_pic)
        }
    })
}
window.getUserInfo = getUserInfo
getUserInfo()

// 退出
$('#logout').on('click', () => {
    // 确认框
    layer.confirm(
        '退出?',
        { icon: 3, title: '提示' },
        () => {
            //    移除token
            window.localStorage.removeItem('token')
            //  去login
            window.location.href = '/login.html'

        }
    )
})
