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

  - 直接给document注册滚动事件——老版本ie**不兼容**fw
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

## 移动端touch事件