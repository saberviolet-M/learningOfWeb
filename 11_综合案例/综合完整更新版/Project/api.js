/* axios默认全局基地址设置 */
const baseURL = 'http://api-breakingnews-web.itheima.net'
axios.defaults.baseURL = baseURL

/* 解构layui消息提醒框 */
const { layer } = window.layui

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url !== '/api/login' || config.url !== '/api/reguser') {
        const AUTH_TOKEN = localStorage.getItem('token')
        config.headers.common['Authorization'] = AUTH_TOKEN
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    const { message, status } = response.data
    let flag = 0
    // 响应成功
    if (status === 0) {
        flag = 1
    }
    layer.msg(message, {
        icon: flag,
        time: 1000 //1秒关闭（如果不配置，默认是3秒）
    })
    // 响应失败
    if (status === 1) {
        return Promise.reject(message)
    }
    return response
}, function (error) {
    // token失效 当http状态码为4或5开头, 进这里
    let { response: { data: { message } } } = error;
    layer.msg(message, {
        // 1.5s自动关闭弹窗
        time: 1500,
        // 弹出层消失以后, 执行这个回调函数执行
        end: function () {
            // 因为过期了, 要把本地的token移出掉
            sessionStorage.removeItem("token");
            // window.parent拿到了父网页的窗口对象 (window是如果在userInfo是子网页的对象)
            window.parent.location.href = "./login.html"
        }
    });
    return Promise.reject(error)
});

/*
*函数名：postUserRegister
*函数作用：POST用户注册接口
*函数形参：
*返回值：
*/
postUserRegister = (req, cb) => {
    axios.post("/api/reguser", req)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：postUserLogin
*函数作用：POST用户登录接口
*函数形参：
*返回值：
*/
postUserLogin = (req, cb) => {
    axios.post("/api/login", req)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：getUserInfo
*函数作用：GET获取用户的基本信息
*函数形参：
*返回值：
*/
getUserInfo = cb => {
    axios.get("/my/userinfo")
        .then(res => {
            cb(res)
        })
}


/*
*函数名：postUserInfo
*函数作用：POST更新用户的基本信息
*函数形参：
*返回值：
*/
postUserInfo = (req, cb) => {
    axios.post("/my/userinfo", req)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：postUpdatePwd
*函数作用：POST重置密码
*函数形参：
*返回值：
*/
postUpdatePwd = (req, cb) => {
    axios.post("/my/updatepwd", req)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：postUpdateAvatar
*函数作用：POST更换头像 
*函数形参：
*返回值：
*/
postUpdateAvatar = (req, cb) => {
    axios.post("/my/update/avatar", req)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：getArticleCates
*函数作用：GET获取文章分类列表
*函数形参：
*返回值：
*/
getArticleCates = cb => {
    axios.get("/my/article/cates")
        .then(res => {
            cb(res)
        })
}


/*
*函数名：getArticleCatesByID
*函数作用：GET根据 Id 获取文章分类数据
*函数形参：
*返回值：
*/
getArticleCatesByID = (req, cb) => {
    axios.get(`/my/article/cates/${req}`)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：postUpdateCate
*函数作用：POST根据 Id 更新文章分类数据 
*函数形参：
*返回值：
*/
postUpdateCate = (req, cb) => {
    axios.post("/my/article/updatecate", req)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：getArticleDeleteCateByID
*函数作用：GET根据 Id 删除文章分类
*函数形参：
*返回值：
*/
getArticleDeleteCateByID = (req, cb) => {
    axios.get(`/my/article/deletecate/${req}`)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：postArticleAddCates
*函数作用：POST新增文章分类 
*函数形参：
*返回值：
*/
postArticleAddCates = (req, cb) => {
    axios.post("/my/article/addcates", req)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：getArticleList
*函数作用：GET获取文章的列表数据
*函数形参：
*返回值：
*/
getArticleList = (req, cb) => {
    axios.get("/my/article/list", {
        params: req,
    })
        .then(res => {
            cb(res)
        })
}

/*
*函数名：getArticleDelete
*函数作用：GET获取文章的列表数据
*函数形参：
*返回值：
*/
getArticleDelete = (req, cb) => {
    axios.get(`/my/article/delete/${req}`)
        .then(res => {
            cb(res)
        })
}


/*
*函数名：getArticleDetailById
*函数作用：GET根据 Id 获取文章详情
*函数形参：
*返回值：
*/
const getArticleDetailById = (id, cb) => {
    axios.get(`/my/article/${id}`)
        .then((res) => {
            cb(res)
        })
}

/*
*函数名：postArticleAdd
*函数作用：POST发布新文章 
*函数形参：
*返回值：
*/
postArticleAdd = (req, cb) => {
    axios.post("/my/article/add", req)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：postArticleEdit
*函数作用：POST根据 Id 更新文章信息 
*函数形参：
*返回值：
*/
postArticleEdit = (req, cb) => {
    axios.post("/my/article/edit", req)
        .then(res => {
            cb(res)
        })
}