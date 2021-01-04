## 1、H5 的新特性有哪些？C3 的新特性有哪些？

### H5新特性

- 拖拽释放（Drap and drop）API ondrop
  - 拖放是一种常见的特性，即抓取对象以后拖到另一个位置，在HTML5中拖放是标准的一部分，任何元素都能拖放
- 自定义属性data-id
- 语义化更好的内容标签
  - header
  - nav
  - footer
  - aside
  - article
  - section
- 音频标签（audio）、视频标签（vedio）
  - 浏览器不支持自动播放的情况下可以在属性中添加autoplay
- **画布Canvas**
  - getContext()---方法返回一个用于在画布上绘图的环境，Canvas.getContext(contextID)参数contextID指定了画布上的绘制类型，这个方法返回一个环境对象，该对象导出一个绘图API
  - cxt.stroke()使线条显示在画布上
  - canvas和image在处理图片的区别
    - image通过对象的形式描述图片，canvas通过专门的API将图片绘制在画布上
- **地理（Geolocation）API**
- 本地离线存储localStorage，长期存储数据到本地，浏览器关闭后不丢失数据
- sessionStorage，网页间存储，网页关闭时数据删除
- 表单控件
  - calendar、date、time、email、url、search、tel、file、number
- **新技术 webworker、websocket、Geolocation**

### CSS3新特性

- 颜色：新增RGBA、**HSLA模式**
- 文字阴影（text-shadow）
- 边框圆角（border-radius）、边框阴影（border-shadow）
- 盒子模型（box-sizing）
- 背景
  - background-size
  - **background-origin**
  - **background-clip**
- 渐变
  - linear-gradient
  - radial-gradient
- 过度（transition）---可实现动画
- 自定义动画（animate @keyframes）
- 媒体查询 （@media screen and(width:800px){...}）
- 边框图片（border-image）
- 2D转换
  - transform
  - trasnslate(x,y)
  - rotate(x,y)
  - skew(x,y)
  - scale(x,y)
- 3D转换
- 字体图标（font-face）
- 弹性布局（flex）

