// 页面渲染
let total = 0 // 数据总条数
let laypage = layui.laypage

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
                    <a href="../publisher/publisher.html?id=${item.Id
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

// 筛选按钮
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

// 筛选请求
$('.search').on('submit', (e) => {
    e.preventDefault()
    q.cate_id = $('select[name=category]').val()
    q.state = $('select[name=state]').val()
    loadList()
})

// 删除文章
$('.layui-table tbody').on('click', '.del', function () {
    getArticleDelById($(this).attr('myid'), (res) => {
        loadList()
    })
})


