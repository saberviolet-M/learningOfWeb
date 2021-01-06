/* 0、判断是否是文章列表跳转来的文章编辑 */
const id = window.location.search.substr(4)

const handleIDEdit = () => {
    if (id) {
        getArticleDetailById(id, (res) => {
            form.val('edit', res.data.data)
            layui.form.render('select', 'edit')
            // 基地+变址 = 需要更换的裁剪区地址
            cropper.replace(baseURL + res.data.data.cover_img)
        })
    }
}

handleIDEdit()





/* 1、富文本插件 */
const initTinyMce = () => {
    tinymce.init({
        selector: 'textarea[name=content]', //容器，可使用css选择器
        language: 'zh_CN', //调用放在langs文件夹内的语言包
        plugins: ['link', 'table', 'image'], //选择需加载的插件
        // //选中时出现的快捷工具，与插件有依赖关系
        // quickbars_selection_toolbar: 'bold italic forecolor | link blockquote quickimage',
    })
}
initTinyMce()


/* 2、裁剪插件--封装法 */
let cropper
const initCropper = () => {
    // 1. 集成裁剪插件
    const image = document.getElementById('image'); // 获取到要被添加裁剪插件的图片
    cropper = new Cropper(image, {
        aspectRatio: 1, // 横纵比例
        preview: $(".img-preview")
    })
}
initCropper()

/* 3、选择分类 */
getArticleCates(res => {
    let arr = res.data.data
    arr.forEach(obj => {
        let theOption = `<option value="${obj.Id}" lay-verify="cate">${obj.name}</option>`
        $("select[name=cate_id]").append(theOption)
        // 让layui刷新一下form表单
        layui.form.render('select', 'edit')
        handleIDEdit()
    })
})

/* 4、表单提交 */

// 1、裁剪插件更换图片
//点击按钮 -让别的按钮触发点击事件
$(".select").on("click", e => {
    $("#file").click()
})
//选择文件窗口出现 - 选中文件点击打开, 会触发change事件
$("#file").on("change", function (e) {
    let url = URL.createObjectURL(this.files[0])
    cropper.replace(url)
})

// 发布文章 - 表单 - 提交事件
$(".layui-form").on("submit", e => {
    e.preventDefault()
    // 富文本里的东西取出(唯一的用activeEditor)
    let htmlStr = tinyMCE.activeEditor.getContent()
    // 把封面图片的裁剪区域提取出来
    let canvas = cropper.getCroppedCanvas({
        width: 100,
        height: 100
    });
    // 后台要的是FormData数据类型(内容载体)
    let fd = new FormData($(".layui-form")[0])
    fd.set("content", htmlStr) // set(设置值), append(新增)
    // 把canvas -> File(Blob)文件对象 (异步任务)
    canvas.toBlob(function (blobObj) {
        fd.append("cover_img", blobObj)
        if (id) {
            // 根据文章id编辑文章
            fd.append('Id', id)
            postArticleEdit(fd, res => {
                setTimeout(() => {
                    /* 5、提交表单后跳转 */
                    window.location.href = '../list/list.html'
                }, 800)
            })
        } else {
            // 新增文章
            postArticleAdd(fd, res => {
                setTimeout(() => {
                    /* 5、提交表单后跳转 */
                    window.location.href = "../list/list.html";
                }, 1500);
            })
        }
    })
})






