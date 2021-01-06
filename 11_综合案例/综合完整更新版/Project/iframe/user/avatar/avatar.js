// 插件初始化
// 第一个参数必须是img或者canvas的DOM对象
const myCropper = new Cropper($('#image')[0], {
    aspectRatio: 1,//裁剪图层的横纵比例
    preview: $(".img-preview")//预览
})

// 修改Cropper裁剪区
getUserInfo(res => {
    const { user_pic } = res.data.data
    if (user_pic) {
        $('#image').prop('src', user_pic)
        myCropper.replace(user_pic)
    }

    // 确认提交
    $('.sure').on('click', e => {
        let canvas = myCropper.getCroppedCanvas({
            width: 100,
            height: 100
        })//获取一个Cropper画布
        let base64url = canvas.toDataURL('image/jpeg')//将画布转换成URL地址
        base64url = encodeURIComponent(base64url)//将URL地址转换成base64格式
        let req = "avatar=" + base64url//拼接请求数据
        postUpdateAvatar(req, res => {
            window.parent.loadUserInfo()//渲染父级页面
        })
    })
})

// 选择图片
$('.select').click(() => {
    $('#file').click()
})

$('#file').change(function () {
    const url = URL.createObjectURL(this.files[0])
    myCropper.replace(url)
})




