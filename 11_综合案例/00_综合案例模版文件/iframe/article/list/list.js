var allCount = 0; // 保存的是后台现有的文章总数
let q = {
    pagenum: 1, // 页数(你要第几页的数据)
    pagesize: 2, // 每页"要"多少条数据
    cate_id: "", // 分类ID (可选, 可以给值也可以不给值)
    state: "", // (已发布, 草稿) 只能是这2个值
}

// 1. 获取文章数据列表
function load(){
    artListAPI(q, res => {
        // 2. 把数据铺设到页面上
        let arr = res.data.data;
        // (重要不好理解): 当前页码对应的数据没有了, 虽然分页器能自动跳转到上一页页码, 但是q对象的pagenum还是当前这页, 所以我们需要自己来写js判断,(判断条件就是看当前这页是否还有数据)
        if (arr.length === 0) { // 证明当前这页没有数据了
            q.pagenum--;
            load(); // 再用上一页的页码, 重新请求上一页的数据
            return;
        }
        allCount = res.data.total; // 后台返回的数据总数, 放到了全局变量上
        $(".layui-table tbody").empty();
        arr.forEach(obj => {
            var theTr = `<tr>
                            <td>${obj.title}</td>
                            <td>${obj.cate_name}</td>
                            <td>${obj.pub_date}</td>
                            <td>${obj.state}</td>
                            <th>
                            <a href="/iframe/article/publisher/publisher.html?id=${obj.Id}" class="layui-btn layui-btn-xs">编辑</a>
                            <button myid="${obj.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger del">删除</button>
                            </th>
                        </tr>`;
            $(".layui-table tbody").append(theTr);
        })
        setPage(); // 生成分页器
    })
}
load();

// 2. 分页器 - 初始化
function setPage(){
    var laypage = layui.laypage;
    //执行一个laypage实例
    laypage.render({
        elem: 'page', // 分页所在的容器标签的ID, 不需要#
        count: allCount, // 数据总数，从服务端得到
        limit: q.pagesize, // 每页显示的条数
        limits: [2, 5, 10, 20], // 下拉组件每个条数
        layout: ['count', 'prev', 'page', 'next', "limit", "skip"],
        curr: q.pagenum, // setPage只要调用, 分页器就会重新生成, 所以要设置起始页
        jump: function(obj, first){ // 3. 分页改变时, 回调这个函数执行
            // obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); // 得到当前页，以便向服务端请求对应页的数据。
            console.log(obj.limit); // 得到每页显示的条数
            // laypage.render每次调用初始化分页器, 会让jump马上触发, 调用load后, setPage又调用. laypage.render有执行, jump又调用, load --- 循环卡死. 
            // 首次不执行 -第一次渲染这个分页器的时候first是true, 其他时候是undefined
            if(!first){
                q.pagenum = obj.curr; // 把页面同步到参数q对象身上
                q.pagesize = obj.limit; // 同步选中当前页有多少条数据到q对象身上
                load();
            }
        }
    });
}

// 4. 类别数据获取和铺设
cateListAPI({}, res => {
    let arr = res.data.data;
    $("select[name=category]").append(`<option value="" lay-verify="cate">所有分类</option>`); // 默认选项- 默认获取所有分类
    arr.forEach(obj => {
        var theOption = `<option value="${obj.Id}" lay-verify="cate">${obj.name}</option>`;
        $("select[name=category]").append(theOption);
    })
    // 让layui刷新一下form表单
    layui.form.render('select', 'category');

    // 5. 分类数据回来了, 再绑定筛选表单的submit事件
    $(".search").on("submit", e => {
        e.preventDefault();
        // 把下拉菜单的值, 放到参数q对象里, 再让load执行一次, 把参数对象q发给后台, 获取新的数据, load铺设页面
        q.cate_id = $("select[name=category]").val();
        q.state = $("select[name=state]").val();
        load();
    })
})


// 6. 删除按钮 - 事件委托 - 点击事件
$(".layui-table tbody").on("click", ".del", function(){ // this: 事件源删除按钮
    // id拔下来  $(this).attr("myid");
    // 调用删除接口通知后台把这条数据删除
    delArtAPI($(this).attr("myid"), res => { // 这个回调函数能进来证明完全成功(响应拦截器里有判断)
        load();
    })
})
