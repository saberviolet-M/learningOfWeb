# day54

## 发布文章页面（publisher）

### 表单验证

```js
// publisher页面 - 文章标题
articleTitle: [
    /^[\u4E00-\u9FA5a-zA-Z0-9_-]+$/,
    "标题只能是中英文, 数字下划线中划线组成"
],
// 分类判断
cate: function(){
	return $("select[name=cate_id]").val().length == 0 && "请选择分类"
}
```

### 选择分类

```js
getArticleCate(res => {
    let arr = res.data.data
    //遍历数组
    arr.forEach(obj => {
        //声明模版字符串
        let theOption = `<option value="${obj.Id}" lay-verify="cate">${obj.name}</option>`
        //追加DOM
        $("select[name=cate_id]").append(theOption)
        // 让layui刷新一下form表单,动态添加的layui表单需要如此
        layui.form.render('select', 'edit')
    })
})
```

### 富文本插件

```js
// 2. 集成富文本编辑器
function initTinyMce() {
    tinymce.init({
        selector: 'textarea[name=content]', //容器，可使用css选择器
        language: 'zh_CN', //调用放在langs文件夹内的语言包
        plugins: ['link', 'table', 'image'], //选择需加载的插件
        // //选中时出现的快捷工具，与插件有依赖关系
        // quickbars_selection_toolbar: 'bold italic forecolor | link blockquote quickimage',
    })
}
initTinyMce()
```

- **[tinymce中文文档](http://tinymce.ax-z.cn/)**

### 封面插件

```js
let cropper;
function initCropper() {
    // 1. 集成裁剪插件
    const image = document.getElementById('image'); // 获取到要被添加裁剪插件的图片
    cropper = new Cropper(image, {
        aspectRatio: 1, // 横纵比例
        preview: $(".img-preview")
    })
}
initCropper()
// 2. 点击按钮 -让别的按钮触发点击事件
$(".select").on("click", e => {
    $("#file").click()
})
// 3. 选择文件窗口出现 - 选中文件点击打开, 会触发change事件
$("#file").on("change", function (e) {
    let url = URL.createObjectURL(this.files[0])
    cropper.replace(url)
})
```

### 表单提交

```js
//api
/*
*函数名：addNewArticle
*函数作用：发送post请求发布新文章
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const addNewArticle = (dataStr, cb) => {
    axios.post("/my/article/add", dataStr)
        .then(res => {
            cb(res)
        })
}

/*
*函数名：postArticleEditById
*函数作用：发送post请求更改文章
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const postArticleEditById = (data, cb) => {
    axios.post("/my/article/edit", data).then((res) => {
        cb(res)
    })
}
```

```js
const id = window.location.search.substr(4)
$(".layui-form").on("submit", e => {
    e.preventDefault();
    // 富文本里的东西取出(唯一的用activeEditor)
    var htmlStr = tinyMCE.activeEditor.getContent();
    // 把封面图片的裁剪区域提取出来
    var canvas = cropper.getCroppedCanvas({
        width: 100,
        height: 100
    });
    // 后台要的是FormData数据类型(内容载体)
    let fd = new FormData($(".layui-form")[0]);
    fd.set("content", htmlStr); // set(设置值), append(新增)
    // 把canvas -> File(Blob)文件对象 (异步任务)
    canvas.toBlob(function (blobObj) {
        fd.append("cover_img", blobObj);
        if (id) {
            // 根据文章id编辑文章 => API
            fd.append('Id', id)
            //通过文章ID编辑文章内容
            postArticleEditById(fd, (res) => {
                setTimeout(() => {
                    window.location.href = '../list/list.html'
                }, 800)
            })
        } else {
            addNewArticle(fd, res => {
                setTimeout(() => {
                    window.location.href = "../list/list.html";
                }, 1500);
            })
        }
    })
})
```

### PS：从list跳转到编辑页面时需要获取封面图片

```js
const handleIDEdit = () => {
    if (id) {
        getArticleDetailById(id, (res) => {
            form.val('edit', res.data.data)
            layui.form.render('select', 'edit')
            const baseURLByImg = `http://ajax.frontend.itheima.net`
            cropper.replace(baseURLByImg + res.data.data.cover_img)
        })
    }
}
handleIDEdit()
```

## 文章列表页面（list）

### 页面渲染

```js
//api
/*
*函数名：getArticleDetailInfo
*函数作用：发送get请求获取文章的列表数据
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const getArticleDetailInfo = (data, cb) => {
    axios.get(`/my/article/list`, {
        params: data,
    })
        .then(res => {
            cb(res)
        })
}
```

```js
// 页面渲染
let total = 0 // 数据总条数

const q = {
    pagenum: 1, //第几页数据
    pagesize: 2, // 每页几条
    cate_id: '', // 分类
    state: '', // 状态 已发布/草稿
}

// 渲染文章列表
const loadList = () => {
    getArticleDetailInfo(q, res => {
        total = res.data.total
        const list = res.data.data
        $('.layui-table tbody').empty()
        list.forEach((item) => {
            let theTr = `<tr>
                    <td>${item.title}</td>
                    <td>${item.cate_name}</td>
                    <td>${moment(item.pub_date).format(
                'YYYY-MM-DD hh:mm:ss a'
            )}</td>
                    <td>${item.state}</td>
                    <th>
                    <a href="/iframe/article/publisher/publisher.html?id=${item.Id
                }" class="layui-btn layui-btn-xs">编辑</a>
                    <button myid="${item.Id
                }" type="button" class="layui-btn layui-btn-xs layui-btn-danger del">删除</button>
                    </th>
                    </tr>`
            $('.layui-table tbody').append(theTr)
        })
        setPage()
    })
}
loadList()
```

### 分页控件

```js
let laypage = layui.laypage
// 分页控件的配置
const setPage = () => {
    laypage.render({
        elem: 'page', // ID值 不写#
        count: total, // 总条数
        curr: q.pagenum,
        limit: q.pagesize,
        layout: ['count', 'prev', 'page', 'next', 'limit'],
        limits: [q.pagenum, 3, 5, 10],

        // (使用经验)分页控件第一次使用时  &  (文档)切换分页页码时,都会自动触发jump
        jump: (obj, first) => {
            if (!first) {
                // 如果不是第一次设置分页控件
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                loadList()
            }
        },
    })
}
```

### 筛选按钮

```js
//api
/*
*函数名：getCateList
*函数作用：发送get请求获取文章分类列表
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const getCateList = (cb) => {
    axios.get("/my/article/cates")
        .then((res) => {
            cb(res)
        })
}
```

```js
getCateList((res) => {
    let arr = res.data.data
    $('select[name=category]').append(
        `<option value="" lay-verify="cate">所有分类</option>`
    ) // 默认选项- 默认获取所有分类
    arr.forEach((obj) => {
        let theOption = `<option value="${obj.Id}" lay-verify="cate">${obj.name}</option>`
        $('select[name=category]').append(theOption)
    })
    layui.form.render('select', 'category')
})
```

### 筛选请求

```js
// 筛选请求
$('.search').on('submit', (e) => {
    e.preventDefault()
    q.cate_id = $('select[name=category]').val()
    q.state = $('select[name=state]').val()
    loadList()
})
```

### 删除文章

```js
//api
/*
*函数名：getArticleDelById
*函数作用：发送get请求删除文章
*函数形参：参数1：发送数据;参数2：回调函数
*返回值：无
*/
const getArticleDelById = (Id, cb) => {
    axios.get(`/my/article/delete/${Id}`)
        .then((res) => {
            cb(res)
        })
}
```

```js
// 删除文章
$('.layui-table tbody').on('click', '.del', function () {
    getArticleDelById($(this).attr('myid'), (res) => {
        loadList()
    })
})
```



