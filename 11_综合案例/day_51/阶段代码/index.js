// 校验token
if (!localStorage.getItem('token')) {
    location.href = './login.html'
}