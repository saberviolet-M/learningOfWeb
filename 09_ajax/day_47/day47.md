# day47

## 综合案例

### 克鲁塞德战记英雄查询

- PS：ajax动态生成的元素，添加事件需要使用**事件委派**

- PS：有些技能gif服务器没有
- PS：url不支持空格

## ajax知识补充

### ajax-onreadystatechange

> 作用与onload一致，都是服务器的响应回调
>
> **区别：**
>
> - `onload`兼容性不好（部分老版本浏览器不支持）
> - `onreadystatechange`兼容性好（几乎兼容所有浏览器）
>   - 会触发多次，触发时机是`ajax`状态变化时
>     - 解决方案就是判断`xhr.readyState == 4`再获取数据
> - `onload`底层就是`onreadystatechange`的第四个状态

### HTTP工作原理

>  数据交换协议
>
> - 协议：是一种规范

#### HTTP协议规定：

- 客户端发送数据必须满足请求报文
- 服务端端响应数据必须满足响应报文

#### 请求报文由三部分组成

- 请求行
- [图片位]
  - 请求路径`url`
  - 请求方法`method`
- 请求头
- [图片位]
  - **客户端**发送的**数据格式**
- 请求体
- [图片位]
  - 请求参数

#### 响应报文由三部分组成

- 响应行
- [图片位]
  - 响应状态编码`Status Code`
    - 2开头：请求OK
    - 4开头：前端问题
      - 400：参数写错（无法解析状态码）
      - 403：拒绝接受访问（**Forbidden**）
      - 404：网址写错（找不到资源）
    - 5开头：后端问题
  - 服务器地址`Remote Address`
- 响应头
- [图片位]
  - **服务器**发送的**数据格式**
- 响应体
- [图片位]
  - 响应数据

### ajax工作原理

> 设置请求报文

## ajax文件相关操作

### 文件预览

- 1、给`file`表单注册`change`事件（监听文件变化）

- 2、获取用户选中的文件

  ```js
  this.files[0];//此步骤是DOM原生独有的语法
  ```

- 3、文件对象生成`url`（`img`标签显示图片需要`src`路径）

  ```js
  URL.createObjectURL(文件对象)//URL是内置对象，专门存储URL相关属性方法
  ```

- 4、生成的`url`放到`img`标签的`src`属性里

### 文件上传

- 1、阻止表单默认跳转行为

- 2、`FormDate`获取文件(文本)参数（一定要有文件）

  ```js
  /* 使用方法一 */
  let fd = new FormDate();
  fd.append('key','value');
  $.ajax({
      /*url:'',
      type:'post',
      dataType:'json',*/
      data:fd,
      /*
      	默认情况下，jq会自动遍历data参数对象，拼接成key=value&key1=value1格式
      	processDate:false,关闭默认jq转字符串过程，让FormDate按照二进制方式提交文件
      */
      processDate:false,
      /*
      	post发送文本的默认请求头type为'wapplication/x-www-form-urlencoded';
      	contentType:false,关闭默认type
      */
      contentType:false,
      /*success: function(backData){}*/
  });
  
  /* 使用方法二 */
  /*
  	参数是form表单元素，DOM对象 
  	底层原理与上述相同，自动获取表单每一个元素，将name属性与value属性自动append到参数中
  	使用此方法，form表单中一定要name属性，且严格按照接口文档所写
  */
  let fd = new FormDate($('form')[0])
  
  /* 上述两种方法可以混用 */
  ```