// 0. 因为这个 页面可能是点击发布过来的 / 点击编辑按钮 过来的
// 如果是点击编辑按钮, url上?后面会有id的参数
let argStr = location.search;
let id = argStr.substr(4); // ?id=xxx 我们要后面的id值, 前面?id= 正好4位略过, 从4开始截取后面的id
if (id) { // 获取文章的详情
    detailArtAPI(id, res => {
        // 铺设到页面上
        layui.form.val("edit", res.data.data);
        // (1): 下拉菜单的选择问题
        layui.form.render('select', 'edit');
        // (2): 让裁剪插件也替换一下
        cropper.replace(res.data.data.cover_img);
    })
}

// 1. 获取所有的分类 - 铺设到下拉菜单中
cateListAPI({}, res => {
    let arr = res.data.data;
    arr.forEach(obj => {
        var theOption = `<option value="${obj.Id}" lay-verify="cate">${obj.name}</option>`;
        $("select[name=cate_id]").append(theOption);
        // 让layui刷新一下form表单
        layui.form.render('select', 'edit');
    })
})

// 2. 集成富文本编辑器
function initTinyMce() {
    tinymce.init({
        selector: 'textarea[name=content]', //容器，可使用css选择器
        language: 'zh_CN', //调用放在langs文件夹内的语言包
        plugins: ['link', 'table', 'image'], //选择需加载的插件
        // //选中时出现的快捷工具，与插件有依赖关系
        // quickbars_selection_toolbar: 'bold italic forecolor | link blockquote quickimage',
    });
}
initTinyMce();

// 3. 集成图片裁剪的插件
let cropper;
function initCropper() {
    // 1. 集成裁剪插件
    const image = document.getElementById('image'); // 获取到要被添加裁剪插件的图片
    cropper = new Cropper(image, {
        aspectRatio: 1, // 横纵比例
        //   crop(event) { // 裁剪的事件
        //     console.log("=========");
        //     console.log(event.detail.x); // 裁剪插件左上角的x坐标
        //     console.log(event.detail.y); // ..y坐标
        //     console.log(event.detail.width); // 裁剪插件的宽高
        //     console.log(event.detail.height);
        //     console.log(event.detail.rotate); // 旋转
        //     console.log(event.detail.scaleX); // 缩放比例
        //     console.log(event.detail.scaleY);
        //   },
        preview: $(".img-preview")
    });
}
initCropper();
$(".select").on("click", e => { // // input[type=file]标签的样式改不动, 所以我们用button[class=select]按钮来让用户点击
    $("#file").click();  // JS代码来主动触发input[type=file]的点击事件 - 选择文件的窗口就出来
})

// 4. 选择文件窗口出现 - 选中文件点击打开, 会触发change事件
$("#file").on("change", function (e) {
    var url = URL.createObjectURL(this.files[0]); // URL是window内置的对象, createObjectURL就是把blob对象(File的父类)转成url地址(浏览器本地的-跟后台无关)
    cropper.replace(url); // 让cropper重新设置图片url地址以及重新构建cropper
})

// 5. 发布文章 - 表单 - 提交事件
$(".layui-form").on("submit", e => {
    e.preventDefault();
    // 富文本里的东西取出(唯一的用activeEditor)
    var htmlStr = tinyMCE.activeEditor.getContent();
    // 把封面图片的裁剪区域提取出来
    var canvas = cropper.getCroppedCanvas({
        width: 100,
        height: 100
    });

    // 后台要的是FormData数据类型(内容载体)
    let fd = new FormData($(".layui-form")[0]);
    fd.set("content", htmlStr); // set(设置值), append(新增)

    // 把canvas -> File(Blob)文件对象 (异步任务)
    canvas.toBlob(function (blobObj) {
        fd.append("cover_img", blobObj);

        // fd.forEach((value, key) => {
        //     console.log(value, key);
        // })

        if (id) { // 本次是想编辑更新
            fd.append("Id", id);
            updateArtAPI(fd, res => {
                console.log(res);
                setTimeout(() => {
                    window.location.href = "../list/list.html";
                }, 1500);
            })
        } else { // 发布新文章
            // 6. 调用后台 - 发布文章的接口
            addArtAPI(fd, res => {
                // / 在浏览器运行的地址栏上的"根路径"
                // . 当前文件夹
                // .. 上一级文件夹  (../..)上一级的上一级文件夹
                // ./当前文件夹下的什么什么
                // ../上一级文件夹下的什么什么
                setTimeout(() => {
                    window.location.href = "../list/list.html";
                }, 1500);
            })
        }

    })


})