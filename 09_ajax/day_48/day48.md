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

### 函数防抖（性能优化）

- 抖动：鼠标轻微晃动（误操作），快速划过一个元素，就会触发这个元素的事件
- 函数防抖：鼠标停留在元素上面事件过短，则认为是用户误操作，不触发事件
- 解决方案：
  - 1、声明全局变量存储定时器**id**
  - 2、每一次触发事件的时候先清除上一次的定时器，以最后一次触发为准
  - 3、触发事件时开启定时器，等待（500ms）才会触发
    - 定时器中`this`默认为`window`需要动态处理`this`指向

#### 万能防抖函数封装

```js
//fn:事件处理函数  time:防抖时间
function debounce(fn,time){
    /* 使用静态成员存储定时器id */
   	clearTimeout(debounce.timeID);
    debounce.timeID = setTimeout(function(){
        fn();
    },time)
    /*等同
    debounce.timeID = setTimeout(fn,time)
    */
}
```

### 函数节流

- 高频事件：触发频率高的事件
  - 单击：快速点击会快速触发
  - 滚动
  - 移动
- 高频事件的影响
  - 性能影响：当函数体代码过多，频繁触发会影响性能
  - 造成卡顿：有一些事件可能会有ajax请求，触发过快会影响服务器压力
- 函数节流
  - 让事件函数在间隔时间内只触发一次 
- 实现方案
  - 1、先记录当前触发时间
  - 2、第二次触发的时候，判断当前时间➖第二次触发时间
    - 小于时间间隔：不触发
    - 达到间隔则触发，且把此次触发时间作为下一次的减数

#### 万能节流函数封装

```js
//fn:事件处理函数  time:防抖时间
function throrrle(fn,time){
    /* 使用静态成员存储上一次的触发时间 */
	if(!throttle.lastTime){
        throttle.lastTime = new Date().getTime();
    };
    /* 判断第二次触发时间和上一次触发时间 */
    let currentTime = new Date().getTime();
    if(currentTime - throttle.lastTime >= time){
        fn();
        /* 把触发时间作为下一触发的减数 */
        throttle.lastTime = currentTime;
	}
}
```

### 异同点

- 相同：属于网页性能优化
- 不同点：
  - 防抖：优化`用户主动`触发事件的执行效率，在`间隔时间`内以最后一次触发为准
  - 节流：优化`事件本身`高频率触发的执行效率，在`间隔时间`内只执行一次

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
axios.get(地址?key=value&key2=value2).then(function(response){},function(err){})

axios.get(地址?key=value&key2=value2).then(function(response){}).catch(function(err){})
```

####  axios.post

```js
axios.post(地址,{key:value,key2=value2}).then(function(response){},function(err){})

axios.post(地址,{key:value,key2=value2}).then(function(response){}).catch(function(err){})
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



