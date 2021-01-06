/* 1、渲染页面 */
let allCount = 0 // 保存的是后台现有的文章总数
let req = {
    pagenum: 1,     // 页数(你要第几页的数据)
    pagesize: 1,    // 每页"要"多少条数据
    cate_id: "",    // 分类ID (可选, 可以给值也可以不给值)
    state: ""      // (已发布, 草稿) 只能是这2个值
}

const load = () => {
    getArticleList(req, res => {
        const arr = res.data.data
        $('.layui-table tbody').empty()//渲染前清空列表
        if (arr.length === 0) { // 证明当前这页没有数据了
            req.pagenum--
            load() // 再用上一页的页码, 重新请求上一页的数据
            return
        }
        allCount = res.data.total; // 后台返回的数据总数, 放到了全局变量上
        arr.forEach((item) => {
            let theTr = `<tr>
                    <td>${item.title}</td>
                    <td>${item.cate_name}</td>
                    <td>${moment(item.pub_date).format(
                'YYYY-MM-DD hh:mm:ss a'
            )}</td>
                    <td>${item.state}</td>
                    <th>
                    <a href="../publisher/publisher.html?id=${item.Id
                }" class="layui-btn layui-btn-xs">编辑</a>
                    <button myid="${item.Id
                }" type="button" class="layui-btn layui-btn-xs layui-btn-danger del">删除</button>
                    </th>
                    </tr>`
            $('.layui-table tbody').append(theTr)
        })
        setPage(); // 生成分页器
    })
}
load()

// 分页器
const setPage = () => {
    const laypage = layui.laypage
    laypage.render({
        elem: 'page', // 分页所在的容器标签的ID, 不需要#
        count: allCount, // 数据总数，从服务端得到
        limit: req.pagesize, // 每页显示的条数
        limits: [2, 5, 10, 20], // 下拉组件每个条数
        layout: ['count', 'prev', 'page', 'next', "limit", "skip"],
        curr: req.pagenum, // setPage只要调用, 分页器就会重新生成, 所以要设置起始页
        jump: function (obj, first) {
            // 3. 分页改变时, 回调这个函数执行
            // laypage.render每次调用初始化分页器, 会让jump马上触发, 调用load后, setPage又调用. laypage.render有执行, jump又调用, load --- 循环卡死. 
            // 首次不执行 -第一次渲染这个分页器的时候first是true, 其他时候是undefined
            if (!first) {
                req.pagenum = obj.curr// 把页面同步到参数q对象身上
                req.pagesize = obj.limit // 同步选中当前页有多少条数据到q对象身上
                load()
            }
        }
    });
}




/* 2、选择框 */

getArticleCates((res) => {
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


/* 3、筛选 */
// 筛选请求
$('.search').on('submit', e => {
    e.preventDefault()
    req.cate_id = $('select[name=category]').val()
    req.state = $('select[name=state]').val()
    load()
})

// 删除文章
$('.layui-table tbody').on('click', '.del', e => {
    getArticleDelete($(e.target).attr('myid'), res => {
        load()
    })
})






