const id = window.location.search.substr(4)

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

//选择分类
getArticleCate(res => {
    let arr = res.data.data
    arr.forEach(obj => {
        let theOption = `<option value="${obj.Id}" lay-verify="cate">${obj.name}</option>`
        $("select[name=cate_id]").append(theOption)
        // 让layui刷新一下form表单
        layui.form.render('select', 'edit')
        handleIDEdit()
    })
})

// 富文本插件
function initTinyMce() {
    tinymce.init({
        selector: 'textarea[name=content]',
        language: 'zh_CN',
        plugins: ['link', 'table', 'image'],
    })
}
initTinyMce()

// 集成图片裁剪的插件
let cropper
function initCropper() {
    // 1. 集成裁剪插件
    const image = document.getElementById('image') // 获取到要被添加裁剪插件的图片
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

// 发布文章 - 表单 - 提交事件
$(".layui-form").on("submit", e => {
    e.preventDefault();
    // 富文本里的东西取出(唯一的用activeEditor)
    var htmlStr = tinyMCE.activeEditor.getContent()
    // 把封面图片的裁剪区域提取出来
    var canvas = cropper.getCroppedCanvas({
        width: 100,
        height: 100
    });
    // 后台要的是FormData数据类型(内容载体)
    let fd = new FormData($(".layui-form")[0])
    fd.set("content", htmlStr); // set(设置值), append(新增)
    // 把canvas -> File(Blob)文件对象 (异步任务)
    canvas.toBlob(function (blobObj) {
        fd.append("cover_img", blobObj)
        if (id) {
            // 根据文章id编辑文章 => API
            fd.append('Id', id)
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