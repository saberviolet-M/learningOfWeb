// 1. form标签 - 绑定submit事件
$(".layui-form").on("submit", e => {
    e.preventDefault();
    let obj = {
        oldPwd: md5($(".layui-form input[name=oldPwd]").val()),
        newPwd: md5($(".layui-form input[name=newPwd]").val())
    }
    let argStr = objToAS(obj);
    changePassAPI(argStr, res => {
        // 清除本地的token
        // 强制跳转到登录页面 - 让用户重新登录
        setTimeout(() => {
            sessionStorage.removeItem("token");
            window.parent.location.href = "/login.html";
        }, 1500);
    })
})
// html+css+前端页面的一切功能(交互/验证)+调用接口请求-拿回来数据在回显页面