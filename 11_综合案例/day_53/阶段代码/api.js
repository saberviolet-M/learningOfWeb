// 整个项目的请求方法所在的文件

// 配置baseURL = 基地址
axios.defaults.baseURL = 'http://ajax.frontend.itheima.net/';



// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    if (!config.url.startsWith("/api")) {
        const AUTH_TOKEN = localStorage.getItem('token');
        config.headers['Authorization'] = AUTH_TOKEN;
    }
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
        return response;
        // console.log('token没失效 正确的可用res');
    }
    if (status === 1) {
        return Promise.reject(message);
    }
    return response;
}, function (error) {
    let { response: { data: { message } } } = error;
    layer.msg(message, { // 1.5s自动关闭弹窗
        time: 1500,
        end: function () {
            sessionStorage.removeItem("token");
            window.parent.location.href = "./login.html"
        }
    });
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
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const getInfoUser = cb => {
    axios.get("my/userinfo")
        .then(res => {
            cb(res)
        })
}


// 昵称修改，邮箱修改
/*
*函数名：postUserInfo
*函数作用：发送post请求修改用户昵称邮箱
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const postUserInfo = (dataStr, cb) => {
    axios.post("/my/userinfo", dataStr)
        .then(res => {
            cb(res)
        })
}


// 修改密码
/*
*函数名：postChangePassword
*函数作用：发送post请求修改密码
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const postChangePassword = (dataStr, cb) => {
    axios.post("/my/updatepwd", dataStr)
        .then(res => {
            cb(res)
        })
}

// 修改头像
/*
*函数名：upHeadImgAPI
*函数作用：发送post请求修改密码
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const upHeadImgAPI = (dataStr, cb) => {
    axios.post("/my/update/avatar", dataStr)
        .then(res => {
            cb(res)
        })
}


// 文章分类
/*
*函数名：getArticleCate
*函数作用：发送get请求文章分类
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const getArticleCate = cb => {
    axios.get("/my/article/cates")
        .then(res => {
            cb(res)
        })
}

/*
*函数名：addCategory
*函数作用：发送post请求增加文章分类
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const addCategory = (dataStr, cb) => {
    axios.post("/my/article/addcates", dataStr)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：removeCategory
*函数作用：发送get请求删除文章分类
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const removeCategory = (dataStr, cb) => {
    axios.get(`/my/article/deletecate/${dataStr}`)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：editCategory
*函数作用：发送post请求修改文章分类
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const editCategory = (dataStr, cb) => {
    axios.post("/my/article/updatecate", dataStr)
        .then(res => {
            cb(res)
        })
}