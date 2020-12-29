// 1. 打开userInfo 基本资料 - 默认显示此用户的基本信息
// 用户名不能修改(disabled属性)
getUInfoAPI({}, res => {
    console.log(res);
    // 2. 把值赋予到对应的标签上 (自己原生写很麻烦, 所以用layui的form赋值强大方法)
    //给表单赋值
    let form = layui.form;
    form.val("user", res.data.data); //user 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
    // 内部运作的过程: 
    // 前提给form标签里表单写好 <input name="username">
    // 传入给form.val的对象: {username: "lidongxu1"}
    // 传入的对象的key 和 表单的name属性 配对
    // 配上了, 把对象的值, 赋予给标签的value属性
    // <input name="username" value="lidongxu1">
})

// input的type为hidden / css隐藏了的标签 - 隐藏域
// 前提:
// (1):某个值, 需要提交给后台  (id序号)
// (2):不需要用户看到和编写的参数值 (id序号-每个用户唯一的)
// 使用过程: (JS中使用, 无需用户编辑)
// 获取用户信息后, 可以先"保存"到这个隐藏域的value中
// 当提取页面数据, 要发给后台的时候, 在隐藏域把value值取出来, 交给后台

// 3. 阻止用户信息提交form标签的 - submit行为
$(".layui-form").on("submit", e => {
    e.preventDefault();
    // 4. 自己的提交接口
    var obj = form.val("user");  // 收集页面的输入框name属性和对应的值, 形成一个对象
    delete obj.username; // 删除对象里的某个key以及value值 (因为后台不要username) (严格模式下不允许使用delete)
    var argStr = objToAS(obj); // 形成key=value&key=value格式字符串, 发给后台
    updateInfoAPI(argStr, res => { // 把参数发给后台更新
        // 5. 调用 父页面的window对象身上的方法 (index.js里) 执行
        window.parent.getInfo();
        // 流程:
        // userInfo.js -> 提交修改的数据给后台(后台保存新的昵称和邮箱)
        // 后台 返回一个响应动作, 触发updateInfoAPI的函数体执行
        // 调用父页面的 getInfo方法执行
        // 父页面index.js 调用getUInfoAPI方法 去后台获取用户信息(最新的昵称)
        // 拿回来在index.js的getUInfoAPI的回调函数里铺设父亲的页面(更新了昵称)
    })
})


// 6. 自己实现重置功能
// 系统默认的重置, 会把不可编辑的用户名清空
// 按钮的默认行为会触发form的清空reset事件
// $(".my-reset").on("click", e => { // 点击触发的清空行为, 所以要阻止点击的默认行为, a标签点击跳转也是默认行为, 所以给a绑定click事件, e.preventDefault()
//     e.preventDefault();
// })
$(".layui-form").on("reset", e => {
    e.preventDefault();
    $(".layui-form input[name=nickname]").val(""); // 设置空字符串, 如果写东西叫获取
    $(".layui-form input[name=email]").val("");
})