// 校验token
if (!localStorage.getItem('token')) {
    location.href = './login.html'
}

// 个人信息数据请求