# day48

## 文件上传---进度条

 ```js
$.ajax({
    url:'',
    type:'',
    dataType:'json',
    data:'',
    success: function(backData){
    },
    /* 数据流（多级，分批）上传 */
    /* 添加一个xhr方法，获取jq底层的xhr对象 */
    xhr:function(){
	//(1)获取jq底层xhr对象
        let xhr = $.ajaxSettings.xhr;
    //(2)给xhr的upload对象添加一个progress事件：监听上传进度(PS：不使用onprogress注册事件，是因为on注册事件会覆盖已有事件)
        xhr.upload.addEventListener('progress',function(e){
            //进度条百分比 = 当前进度 / 总进度
            let percent = e.loaded / e.total;
            //给进度条添加动画
            $('进度条的选择器').animate({'width':[进度条宽度]*percent});
        });
    //(3)返回xhr对象：修改jq底层的xhr，改完了就要返回给jq继续使用
        return xhr;
    }
});
 ```

## 综合案例-多页面增删改查

## 函数防抖与函数节流

## axios---仅用于发ajax请求（初）

