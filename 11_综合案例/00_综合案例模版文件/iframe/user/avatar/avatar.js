// 0. 获取用户信息
getUInfoAPI({}, res => {
    let {user_pic} = res.data.data;
    if (user_pic != null) { // 有头像
        // 代码执行流程: 网页打开avatar, getUInfoAPI调用网络请求(异步), 主线程会接着往下走初始化裁剪插件
        // 等网络请求回来, 拿到用户的头像, 再把头像的图片替换到cropper裁剪的插件里显示
        cropper.replace(user_pic);
    }
})

// 1. 集成裁剪插件
const image = document.getElementById('image'); // 获取到要被添加裁剪插件的图片
const cropper = new Cropper(image, {
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

// 2. 偷天换日 - 点击按钮 -偷摸让别的按钮触发了点击事件

$(".select").on("click", e => { // // input[type=file]标签的样式改不动, 所以我们用button[class=select]按钮来让用户点击
    $("#file").click();  // JS代码来主动触发input[type=file]的点击事件 - 选择文件的窗口就出来
})

// 3. 选择文件窗口出现 - 选中文件点击打开, 会触发change事件
$("#file").on("change", function(e){
    var url = URL.createObjectURL(this.files[0]); // URL是window内置的对象, createObjectURL就是把blob对象(File的父类)转成url地址(浏览器本地的-跟后台无关)
    cropper.replace(url); // 让cropper重新设置图片url地址以及重新构建cropper
})

// 4. 确定按钮 - 点击事件
$(".sure").on("click", ev => {
    var canvas = cropper.getCroppedCanvas({ // 利用cropper的方法, 把裁剪区域输出到一个canvas标签上 // width和height是canvas标签的大小
        width: 100,
        height: 100
    });
    var base64Str = canvas.toDataURL("image/jpeg"); // canvas图像 -> base64字符串
    // image/jpeg 是对标签输出的base64字符串做出一个类型的标记
    // 等一会儿把头像base64字符串, 放到img标签的src上, img标签根据类型就知道如何解析这串base64字符串

    // 因为base64Str有一些特殊的符号, 前端要进行URL编码, 再传给后台(node+express)会进行URL解码
    base64Str = encodeURIComponent(base64Str);
    var argStr = "avatar=" + base64Str;
    upHeadImgAPI(argStr, res => {
        // 让父窗口的getInfo方法执行, 请求最新的头像更新父页面
        window.parent.getInfo();
    })
})
// 图片: 本质上0和1的数字. 把0和1转成字符串表示 - (把图片的0和1数据, 按照加密方式, 转成base64字符串) base64的原理
// canvas: 是html5新出的标签, 可以在它的身上任意的绘制任意的内容(包含图片)
