// 整个项目的请求方法所在的文件

// 配置baseURL = 基地址
axios.defaults.baseURL = 'http://ajax.frontend.itheima.net/';



// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log("请求拦截器", config);
    const AUTH_TOKEN = localStorage.getItem('token');
    config.headers['Authorization'] = AUTH_TOKEN;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log(response);
    const { status, message, token } = response.data
    layer.msg(message);
    if (status === 0) {
        // console.log('token没失效 正确的可用res');
    }
    if (status === 1) {
        localStorage.removeItem('token');
        location.href = './login.html';
    }
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
        });
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
            console.log(res);
            const { token } = res.data;
            localStorage.setItem('token', token);
            cb(res)
        });
}


// 个人信息数据请求api
/*
*函数名：getInfoOfUser
*函数作用：发送get请求用户信息
*函数形参：
*返回值：
*/
const getInfoUser = cb => {
    axios.get("my/userinfo")
        .then(res => {
            // console.log(res);
            cb(res)
        })
}