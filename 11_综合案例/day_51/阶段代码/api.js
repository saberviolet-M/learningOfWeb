// 整个项目的请求方法所在的文件

// 配置baseURL = 基地址
axios.defaults.baseURL = 'http://ajax.frontend.itheima.net/';

/*
*函数名：postRegUser
*函数作用：发送post请求注册用户
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const postRegUser = (dataStr, cb) => {
    axios.post("api/reguser", dataStr)
        .then(res => {
            if (res.data.status === 0) {
                cb(res)
            }
            layer.msg(res.data.message);
        })
}

/*
*函数名：postLogin
*函数作用：发送post请求用户登录
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const postLogin = (dataStr, cb) => {
    axios.post("api/login", dataStr)
        .then(res => {
            if (res.data.status === 0) {
                // 弹层组件文档 - layui.layer
                cb(res)
            }
            layer.msg(res.data.message);
        })
}


