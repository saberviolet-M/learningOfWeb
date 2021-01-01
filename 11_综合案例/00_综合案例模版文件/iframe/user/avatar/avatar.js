// 更换头像
getInfoUser(res => {
    let { user_pic } = res.data.data
    debugger
    if (user_pic) $("#image").attr("src", user_pic)
    handleCropper()
})


const handleCropper = () => {
    // 1. 初始化裁剪插件
    let cropper = new Cropper($("#image")[0], {
        aspectRatio: 1,
        preview: $(".img-preview")
    })

    // 2. 点击按钮 -让别的按钮触发点击事件
    $(".select").on("click", e => {
        $("#file").click()
    })

    // 3. 选择文件窗口出现 - 选中文件点击打开, 会触发change事件
    $("#file").on("change", function (e) {
        let url = URL.createObjectURL(this.files[0])
        cropper.replace(url)
    })

    //提交修改&渲染页面
    $(".sure").on("click", e => {
        let canvas = cropper.getCroppedCanvas({
            width: 100,
            height: 100
        })
        let base64Str = canvas.toDataURL('../../../assets/images/sample.jpg')

        base64Str = encodeURIComponent(base64Str)
        let argStr = "avatar=" + base64Str
        upHeadImgAPI(argStr, res => {
            window.parent.getUserInfo()
        })
    })
}
