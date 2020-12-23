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

## axios（初）

> 发送ajax请求

### axios与jq的对比

- `axios`体积小（节省性能）
- `axios`只有发送`ajax`的功能
- 技术新（高效），`axios`底层使用了**ES6**的新技术
- **唯一缺点**：兼容性不好

### 语法

####  axios.get

```js
//url路径
axios.get('url', {
    //params参数
    params: {
      key: value
    }
  })
	//成功请求回调
    .then(function (response) {
})
	//错误捕获
    .catch(function (error) {
}) 
```

####  axios.post

```js
//url路径参数
axios.post('url', {
    //data参数
    data: {
      key: value
    }
})
	//成功请求回调
    .then(function (response) {
})
	//错误捕获
    .catch(function (error) {
});
```

####  axios---(最常用)

```js
// POST
axios({
  method: 'post',
  url: '路径',
  data: {
    key: value
  }
}) 
//成功回调
.then(function (response) {
    //响应数据response
});

// GET
axios({
  method: 'get',
  url: '路径',
  params: {
    key: value
  }
}) 
//成功回调
.then(function (response) {
    //响应数据response
});
```



