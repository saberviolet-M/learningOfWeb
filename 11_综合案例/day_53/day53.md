# day53

## 类别管理页 （category）

### 页面展示

```js
//api
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
```

```js
getArticleCate(res => {
    //渲染之前清空
    $(".layui-table tbody").empty()
    //解构出需要的数组
    const { data } = res.data
    $(data).each((index, item) => {
        //模版字符串构建html结构
        let show = `
        <tr>
            <td>${item.name}</td>
            <td>${item.alias}</td>
            <td>
            <button myid="${item.Id}" data-name="${item.name}" data-alias="${item.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
            <button myid="${item.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
            </td>
        </tr>`
        $('.layui-table tbody').append(show)
    })
})
```

### 添加类别

```js
// 添加类型 - 弹出层 表单标签--模版字符串
let add_str = `
<form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
    <div class="layui-form-item">
        <label class="layui-form-label">类别名称</label>
        <div class="layui-input-block">
            <input type="text" name="name" required lay-verify="required|ctname" placeholder="请输入标题" autocomplete="off" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">类别别名</label>
        <div class="layui-input-block">
            <input type="text" name="alias" required lay-verify="required|aliname" placeholder="请输入标题" autocomplete="off" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
    </div>
</form>`
```

```js
//添加类型 - 弹出层 表单规则
ctname: [
    /^[\u4E00-\u9FA5]+$/,
    "分类名只能是中文"
],
aliname: [
    /^[a-z0-9]+$/,
    "小写英文和数字组成"
],
```

```js
//api
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
```

```js
$('.layui-card-header .add').click(() => {
    //layer.close(index) - 关闭特定层 - 每一种弹层调用方式，都会返回一个index
    const index = layer.open({
        type: 1,
        content: add_str
    })
    //弹出层表单提交
    $('#add_form').on('submit', e => {
        //阻止默认事件（很重要）
        e.preventDefault()
        //处理表单数据
        const data = $('#add_form').serialize()
        addCategory(data, res => {
            layer.close(index)
            loadArticleCate()
        })
    })
})
```

### 删除类别

```js
//api
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
```

```js
$('.layui-table tbody').on('click', '.delete', e => {
    //e.target 作为被点击的删除按钮.attr获取属性
    const data = $(e.target).attr('myid')
    removeCategory(data, res => {
        //发出请求后 后台已删除内容 于是只需要本次页面删除特定html即可
        //如此可以节省新能
        $(e.target).parents('tr').remove()
    })
})
```

### 编辑类别

```js
// 事件委托 - 编辑按钮 - 点击事件 - 模版字符串
let edit_str = `
<form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="edit_form" lay-filter="edit">
    <div class="layui-form-item">
        <label class="layui-form-label">类别名称</label>
        <div class="layui-input-block">
            <input type="text" name="name" required lay-verify="required|ctname" placeholder="请输入标题" autocomplete="off" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">类别别名</label>
        <div class="layui-input-block">
            <input type="text" name="alias" required lay-verify="required|aliname" placeholder="请输入标题" autocomplete="off" class="layui-input">
        </div>
    </div>
    <input type="hidden" name="Id">
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit >确认修改</button>
        </div>
    </div>
</form>`
```

```js
//api
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
```

```js
$('.layui-table tbody').on('click', '.edit', e => {
    //e.target.getAttribute作为原生方法
    let name = e.target.getAttribute('data-name')
    let alias = e.target.getAttribute('data-alias')
    //$(e.target)包裹成jq对象使用jq方法
    let Id = $(e.target).attr('myid')
    const index = layer.open({
        type: 1,
        content: edit_str,
        //layer.open可以添加成功回调
        success(){
            //form.val---可以给表单中输入框赋值
            form.val('edit', {
                //变量名同对象名
                name: name,
                //变量名同对象名可以只写一次
                alias,
                Id,
            })
        }
    })
    //表单提交
    $('#edit_form').on('submit', e => {
        //阻止默认行为
        e.preventDefault()
        //处理数据
        let data = $('#edit_form').serialize()
        editCategory(data, res => {
            //关闭弹窗
            layer.close(index)
            //重新加载页面
            loadArticleCate()
        })
    })
})
```

## 发表文章页（publisher）

###表单验证

- 发表文章
- 分类选择

### 获取文章分类

