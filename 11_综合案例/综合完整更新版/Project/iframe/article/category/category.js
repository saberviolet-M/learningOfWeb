// 添加类型 - 弹出层 表单标签--模版字符串
const add_str = `
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

// 事件委托 - 编辑按钮 - 点击事件--模版字符串
const edit_str = `
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



/* 1、渲染页面 */
const loadArticleCates = () => {
    $('.layui-table tbody').empty()
    getArticleCates(res => {
        const { data } = res.data
        data.forEach(item => {
            // 页面渲染--模版字符串
            const show = `
    <tr>
        <td>${item.name}</td>
        <td>${item.alias}</td>
        <td>
        <button myid="${item.Id}" data-name="${item.name}" data-alias="${item.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
        <button myid="${item.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
        </td>
    </tr>`
            $('.layui-table tbody').append(show)
        });
    })
}
loadArticleCates()
// 编辑
$('.layui-table').on('click', '.edit', e => {
    const req = $(e.target).attr('myid')
    getArticleCatesByID(req, res => {
        const { Id, alias, name } = res.data.data
        let index = layer.open({
            type: 1,
            content: edit_str,
            success: function () {
                form.val('edit', {//名同lay-filter,layui方法
                    name,
                    alias,
                    Id
                })

                // 修改提交
                $('#edit_form').on('submit', e => {
                    e.preventDefault()
                    const req = $(e.target).serialize()
                    postUpdateCate(req, res => {
                        layer.close(index)
                        loadArticleCates()
                    })
                })
            }
        });
    })
})

// 删除
$('.layui-table').on('click', '.delete', e => {
    const req = $(e.target).attr('myid')
    getArticleDeleteCateByID(req, res => {
        $(e.target).parents('tr').remove()
    })
})


/* 2、添加类别 */
$('.add').click(e => {
    e.preventDefault()
    let index = layer.open({
        type: 1,
        content: add_str,
        success: function () {
            $('#add_form').on('submit', e => {
                e.preventDefault()
                const req = $(e.target).serialize()
                postArticleAddCates(req, res => {
                    console.log(res)
                    layer.close(index)
                    loadArticleCates()
                })
            })
        }
    });
})