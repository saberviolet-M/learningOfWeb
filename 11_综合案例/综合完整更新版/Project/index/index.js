// 登录验证
if (!localStorage.getItem('token')) {
    window.location.href = './login.html'
}

// 页面头像展示
const loadUserInfo = () => {
    getUserInfo(res => {
        const { nickname, user_pic, username } = res.data.data
        // 没有昵称时用户名作为昵称显示
        if (nickname == '') {
            nickname = username
        }
        // 没有图片时，昵称的首字母大写或者文字作为头像
        if (user_pic == null) {
            $('.userinfo .avatar').css('display', 'inline-block').text(nickname.toLocaleUpperCase()[0])
        } else {
            $('.userinfo img').css('display', 'inline-block').attr("src", user_pic)
        }
        $('.username').text(nickname)
    })
}
window.loadUserInfo = loadUserInfo
loadUserInfo()

// 退出键
$('#logout').click(() => {
    // 提示框
    layer.confirm("确定退出?", { icon: 3, title: "提示" }, () => {
        localStorage.removeItem("token");
        window.location.href = "./login.html";
    });
})