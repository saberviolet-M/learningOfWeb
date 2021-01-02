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

// 事件委托 - 编辑按钮 - 点击事件
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


// 页面展示
const loadArticleCate = () => {
    getArticleCate(res => {
        $(".layui-table tbody").empty()
        const { data } = res.data
        $(data).each((index, item) => {
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
}
loadArticleCate()

// 添加分类
$('.layui-card-header .add').click(() => {
    const index = layer.open({
        type: 1,
        content: add_str
    })
    $('#add_form').on('submit', e => {
        e.preventDefault()
        const data = $('#add_form').serialize()
        addCategory(data, res => {
            layer.close(index)
            loadArticleCate()
        })
    })
})

// 删除类别
$('.layui-table tbody').on('click', '.delete', e => {
    const data = $(e.target).attr('myid')
    removeCategory(data, res => {
        $(e.target).parents('tr').remove()
    })
})

// 编辑类别
$('.layui-table tbody').on('click', '.edit', e => {
    let name = e.target.getAttribute('data-name')
    let alias = e.target.getAttribute('data-alias')
    let Id = $(e.target).attr('myid')
    const index = layer.open({
        type: 1,
        content: edit_str,
        success() {
            form.val('edit', {
                name: name,
                alias,
                Id,
            })
        }
    })
    $('#edit_form').on('submit', e => {
        e.preventDefault()
        let data = $('#edit_form').serialize()
        console.log(data);
        debugger
        editCategory(data, res => {
            layer.close(index)
            loadArticleCate()
        })
    })
})