// 添加类型的 - 弹出层上的 表单标签
var add_str = `
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
</form>`;

// 1. 添加类别按钮 - 点击事件
$(".add").on("click", e => {
    let index = layer.open({
        type: 1,
        content: add_str,
        title: "新增分类",
        area: ['500px', '300px'],
        // 2. 因为add-form是在弹出层上
        success() { // 所以必须等弹出层出现以后, 才能 绑定submit事件
            $(".add-form").on("submit", e => {
                e.preventDefault();
                // 3. JQ的serialize方法: 返回的是key=value&key=value的字符串
                // form.val()返回的是对象
                let argStr = $(".add-form").serialize();
                // 4. 调用接口, 把分类发给后台
                addCateAPI(argStr, res => {
                    layer.close(index);
                    load();
                })
            })
        }
    });
})

// 5. 获取现有的分类 - 铺设页面
function load() {
    cateListAPI({}, res => {
        // 6. 提取数据
        let arr = res.data.data;
        $(".layui-table tbody").empty();
        arr.forEach(obj => {
            let theTr = `<tr>
            <td>${obj.name}</td>
            <td>${obj.alias}</td>
            <td>
              <button myid="${obj.Id}" data-name="${obj.name}" data-alias="${obj.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
    
              <button myid="${obj.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
            </td>
          </tr>`;
            $(".layui-table tbody").append(theTr);
        })
    })
}
load();

// 7. 事件委托 - 删除按钮 - 点击事件
$(".layui-table tbody").on("click", ".delete", function () {
    // this指向的是: 调用者(删除的button按钮)
    // 拿到要删除的这条数据绑定的Id值 $(this).attr("myid")
    // 8. 调用接口 - 让后台把id对应的数据再后台抹掉, 前台同步
    delCateAPI($(this).attr("myid"), res => {
        // 当前的删除的按钮对应的tr一行标签自爆
        $(this).parents("tr").remove();
    })
});


// 9. 事件委托 - 编辑按钮 - 点击事件
var edit_str = `
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
  </form>`;
$(".layui-table tbody").on("click", ".edit", function () { // this: 编辑按钮
    // 10. 编辑按钮 - 出现弹出层 - 弹出层的form标签里, 要出现默认值
    // 编辑按钮身上 - 绑定的自定义属性的值(Id, name, alias, 分类名字和别名)
    var Id = $(this).attr("myid");
    var name = $(this).attr("data-name");
    var alias = $(this).attr("data-alias");

    let index = layer.open({
        type: 1,
        content: edit_str,
        title: "编辑分类",
        area: ['500px', '300px'],
        success() {
            // 11. 只要弹出层出现了(form表单出现), 编辑按钮对应的10步数据, 默认显示在输入框里
            // (1): layui.form管理整个项目所有的form标签, 所以要用lay-filter的值来区分
            let form = layui.form;
            form.val("edit", { // 传入一个对象, key和上面的变量名重名了
                Id: Id,
                name,
                alias
            })
            // 12. 用户改完后 - 点击提交按钮
            $(".add-form").on("submit", e => {
                e.preventDefault();
                // 自己来收集数据, 发给后台
                let argStr = $(".add-form").serialize();
                updateCateAPI(argStr, res => {
                    layer.close(index)
                    load();
                })
            })
        }
    });
})

