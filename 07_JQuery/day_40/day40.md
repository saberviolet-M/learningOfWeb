# day40

> **补充：**
>
> ```js
> $('selector').empty()//清空所有子节点(包括元素节点和文本节点等)
> ```

## $-属性补充

### 卷曲（滚动条滚动）

> - 滚动条产生有2种方式
>   - 文档滚动条：标签高度超出屏幕
>   - 盒子滚动条：`overflow-y: auto; `(前提是有固定高度, 内容超出盒子容器高度)

```js
// 滚动事件scroll(监听谁在滚动)
/* 注册给给有滚动条元素 */
$(window).scroll();
$(document).scroll();//document是顶级对象不能调用animate()
/* 监测容器(元素)滚动 */
$('selector').scroll();

// 获取卷入高度(被卷入JQ标签对象.scrollTop();) ;也可以设置滚动位置
$("html,body").scrollTop([数值]);
```

## $-元素操作

### 创建标签&添加标签

```js
$("<p>我是p标签</p>");
$(`<p><span>我是p里的span</span></p>`); // 模板字符串可以任意嵌套标签使用

element.appendTo('父selector'); // 创建元素追加到父元素内前置
element.preappendTo('父selector'); // 创建元素追加到父元素内后置

$("selector").append(element); // 内部末尾追加
$("selector").prepend(element); // 内部头部追加

element.after($("<p>我是after插入的p标签</p>")); // 在目标后面兄弟位置插入标签
element.before($("<p>我是before插入的p标签</p>")); // 在目标前面兄弟位置插入标签
```

### 删除标签

```js
$("selector").remove(); //连带自己以子代都删除
$("selector").html('');	//删除selector内容
$("selector").empty();	//删除selector内容
```

### 克隆

```js
$("selector").clone();//其中子代标签内容也会被clone
$("selector").clone(true);//添加参数true会clone(包括事件)
```