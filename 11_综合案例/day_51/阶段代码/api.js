// 整个项目的请求方法所在的文件

// 配置baseURL = 基地址
axios.defaults.baseURL = 'http://ajax.frontend.itheima.net/';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log("请求拦截器", config);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log("响应拦截", response);
    // 弹层组件文档 - layui.layer
    layer.msg(response.data.message);
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

/*
*函数名：postRegUser
*函数作用：发送post请求注册用户
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const postRegUser = (dataStr, cb) => {
    axios.post("api/reguser", dataStr)
        .then(res => {
            cb(res)
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
            cb(res)
        })
}


