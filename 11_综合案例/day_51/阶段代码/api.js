// 整个项目的请求方法所在的文件

/*
*函数名：postRegUser
*函数作用：发送post请求注册用户
*函数形参：
*返回值：
*/
const postRegUser = (dataStr, cb) => {
    axios.post("http://ajax.frontend.itheima.net/api/reguser", dataStr)
        .then(res => {
            if (res.data.status === 0) {
                cb(res)
            }
            layer.msg(res.data.message);
        })
}


/*
*函数名：postLogin
*函数作用：
*函数形参：
*返回值：
*/
const postLogin = (dataStr, cb) => {
    axios.post("http://ajax.frontend.itheima.net/api/login", dataStr)
        .then(res => {
            if (res.data.status === 0) {
                // 弹层组件文档 - layui.layer
                cb(res)
            }
            layer.msg(res.data.message);
        })
}


