# day29

## offset系列

> 每一个元素上**都有**offset系列的相关属性可以访问

### offsetWidth&offsetHeight

> 元素的宽高

```html
<div style="width:100px;height:100px"></div>
```

```css
div {
    background-color: royalblue;
    padding: 100px;
    border: 10px solid #000;
}
```

![offset盒子](D:\1_2020Web\Note\05_WebAPI\day_29\media\offset盒子.jpg)

```js
let div = document.querySelector('div');
console.log('offsetWidth',div.offsetWidth);
console.log('offsetHeight',div.offsetHeight);
-----------------------------------------------------
console.log('width',div.style.width);
console.log('height',div.style.height);
```

![offset盒子console](D:\1_2020Web\Note\05_WebAPI\day_29\media\offset盒子console.jpg)

- **总结**
  - 1、`div.style.width`&`div.style.height`**只能**获取行**内样**式中的属性**不能**获取**css**样式中的属性
  - 2、`div.offsetWidth`&`div.offsetHeight`获取值为元素的**盒子**大小，包含`content(内容)`&`border(边框)`&`padding(内边距)`
  - 3、`div.offsetWidth`&`div.offsetHeight`返回值为Number（数字类型）可以直接用于运算
  - 4、`div.offsetWidth`&`div.offsetHeight`为**只读**不可以通过该属性修改盒子大小

### offsetParent 

> 获取**最近**的**含有定位**的祖先元素，祖先元素不含定位则获取body

```html
<div class="lv1">
    <div class="lv2">
        <div class="lv3"></div>
    </div>
</div>
```

```js
let lv1 = document.querySelector('.lv1');
let lv3 = document.querySelector('.lv3');
//********************************************
console.log('lv3',lv3.offsetParent);
//********************************************
lv1.style.position = 'relative';//给lv1添加定位
//********************************************
console.log('lv3',lv3.offsetParent);
```

![offsetParent](D:\1_2020Web\Note\05_WebAPI\day_29\media\offsetParent.jpg)

### offsetLeft&offsetTop

> 获取距离offsetParent的left（左侧）或者top（上侧）

```css
* {
    margin: 0;
    padding: 0;
}
div {
    padding: 100px;
}
```

```html
<div class="lv1">
    <div class="lv2">
        <div class="lv3"></div>
    </div>
</div>
```

```js
let lv2 = document.querySelector('.lv2');
let lv3 = document.querySelector('.lv3');
//********************************************
console.log('lv3', lv3.offsetParent);
console.log('lv3', lv3.offsetLeft, lv3.offsetTop);
//********************************************
lv2.style.position = 'relative';//给lv2添加定位
//********************************************
console.log('lv3', lv3.offsetParent);
console.log('lv3', lv3.offsetLeft, lv3.offsetTop);
```

![offsetLT](D:\1_2020Web\Note\05_WebAPI\day_29\media\offsetLT.jpg)

![offset](D:\1_2020Web\Note\05_WebAPI\day_29\media\offset.png)

## 鼠标事件（点击、移动、弹起）

- `onmousedown`---鼠标点击

- `onmousemove`---鼠标移动

- `onmouseup`---鼠标弹起

## 事件对象的作用

- 鼠标事件拿到鼠标的位置

- 键盘事件拿到按下的键盘码

- 阻止浏览器默认行为

  - `return false;` 
    - 1、**只能**用于**on注册事**件时的事件处理函数中
    - 2、`return false;` 后面的代码不会执行，需要写在最后

  - `e.preventDefault()`---方法
    - 1、不局限于**on注册事件**，**addEventListener**也可以使用
    - 2、写在任意位置都可以用来阻止默认行为

- 阻止事件冒泡

  - `e.stopPropagation()`方法可以阻止事件的下一步传播，常用于阻止事件冒泡

## BOM

> BOM（Browser Object Model）：浏览器对象模型，提供了一套操作浏览器功能的工具。

### window对象

> window对象是浏览器的顶级对象，也是一个全局对象（可以直接使用）

