# day31

## [swiper插件](https://www.swiper.com.cn/)

## DOM三大系列

### offset系列

- offsetWidth和offsetHeight：获取元素的**实际大小**

  > `content`+`padding` + `border`

- offsetParent：获取元素最近的有定位的祖先元素

  > 如果祖先元素中**有定位**的元素——找到最近的**有定位的**祖先元素
  >
  > 如果祖先元素中**没有定位**的元素——找到body

- offsetLeft和offsetTop：获取元素距离**offsetParent**左边/上边的距离

### scroll系列

- scrollWidth和scrollHeight：获取元素**内容区域**的宽高

  > 包含`content` +`padding`，不包含`border`

  PS：如果盒子**内容超出**了，此时内容区域大小比盒子实际大小**更大**

- scrollLeft和**scrollTop**：获取元素内容在**水平**和**垂直滚去**的距离

  ![scroll](D:\1_2020Web\Note\05_WebAPI\day_31\media\scroll.png)

- 如果需要在滚动的时候实时拿到滚去的距离，通过注册onscroll事件即可

  ```js
  var box = doucment.getElementById(“box”);
  box.onscroll = function(){
  	//事件处理程序
  }
  ```

- 给**整个网页**注册滚动事件

  - 直接给document注册滚动事件——老版本ie**不兼容**
  - 给window注册滚动事件——现代和老版本ie**都兼容**

- 获取页面滚动时**滚出去的距离**

  - `document.documentElement.scrollTop`---老写法（兼容IE）
  - `window.pageXOffset(pageYOffset)`---新写法

### client系列

- clientWidth和clientHeight：获取元素**可视区域**的大小

  > 包含`content` +`padding`，不包含`border`

  PS：和scroll系列不同，scroll系列是包含内容的超出部分，但是**client只是当前可视区域**

- clientLeft和clientTop：获取元素**左边框**和**上边框**的宽度

- 浏览器窗口大小的获取

  - 早期的做法：

    - `document.documentElement.clientWidth`
    - `document.documentElement.clientHeight`

  - 现在的做法：

    - `window.innerWidth`
    - `window.innerHeight`

  - PS

    > 如果需要**浏览器可视区域宽度变化**之后实时**获取屏幕的宽度**，可以通过给`window`注册`onresize`事件完成

### 三系区别

![compare](D:\1_2020Web\Note\05_WebAPI\day_31\media\compare.png)

### tips

```js
console.log(top);//Js中top是关键字特指window
```

![top](D:\1_2020Web\Note\05_WebAPI\day_31\media\top.jpg)

## 移动端事件

> 通过移动端的touch事件，可以在移动端中完成触摸区域滚动等效果

- 移动端中有4个专属的触摸相关的事件：
  - `touchstart`：开始触摸事件
  - `touchmove`：移动触摸事件（移动时多次触发）
  - `touchend`：结束触摸事件
  - `touchcancel`：取消触摸事件（系统层面取消触摸事件：比如来电话了）

- 移动端事件对象：
  - `e.touches`：当前屏幕上的总手指
  - `e.targetTouches`：当前元素上的总手指
  - `e.changedTouches`：状态改变的总手指（比如：从屏幕上离开）

- 拿到每一个**touch对象**中每一个手指对象即可获取到相关的位置信息：
  - `screenX`和`screenY`：触摸点相当于屏幕的位置
  - `clientX`和`clientY`：触摸点相对于浏览器窗口的位置

  - `pageX`和`pageY`：触摸点相对于页面的位置

## iscroll实现区域滚动(插件---API)

- 引入iscroll.js

- 按照[文档配置](http://caibaojian.com/iscroll-5/)即可

  ```js
  // 第一个参数：设置父容器的css选择器
  // 第二参数：是一个对象，设置相关的个性化配置
  new IScroll('父容器的选择器',{
      // 水平方向是否可以滚动
      scrollX:true,
      // 垂直方向是否可以滚动
      scrollY: false
  }) 
  ```

## 类名操作

> classList是一个集合，会存储某个元素上所有的类名

- classList.add()：往元素上**添加类名**，不会覆盖原有类名
- classList.remove()：往元素上**移除类名**，不会影响其他
- classList.contains()：判断元素的类名中是否**包含此类名**
- classList.toggle()：**切换类名**，原本无就添加，原本有就删除

