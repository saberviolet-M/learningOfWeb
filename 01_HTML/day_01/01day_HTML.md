# day01

## 浏览器

1. Chrome--blink内核
![Chrome](./media/Chrome.png)
1. Firefox--Gecko内核
![Firefox](./media/Firefox.png)
3. IE--trident
![IE](./media/IE.png)
4. safari--Webkit内核
![safari](./media/safari.png)
5. Opera--blink内核 
![Opera](./media/Opera.png)

## Web标准

1. html--格式（好比渤儿哥的身子，骨架）
![格式](./media/hb1.png)
2. css--样式（给渤儿哥化个妆）
![样式](./media/hb2.png)
3. js--行为（能动起来的渤儿哥）
![行为](./media/hb3.jpg)

## html骨架

```html
<html>
   <head>
      <title></title>
   </head>
   <body>
   </body>
</html>
```

## 标签

1. 标签分类
   - 1.同级标签
     - 例如：
      ```html
         <html>
            <head>
               <title></title>
            </head>
            <body>
            </body>
         </html>
      ```
      中`<head></head>&<body></body>`
   - 2.包含标签
     - 例如：
      ```html
         <html>
            <head>
               <title></title>
            </head>
            <body>
            </body>
         </html>
      ```
      中`<head></head>&<title></title>`
   - 3.双标签
     -`<head></head>、<body></body>……` 
   - 4.单标签
     - `<hr>、<br>……`
2. 标签语义化
   - 1.排版标签
      - ```<hr>水平线标签```
         ```html
         <body>
         <p>段落标签</p>
         <p>段落标签</p>
         <p>段落标签</p>
         </body>
         ```
         ![段落标签](./media/段落标签.jpg)
      - ```<hr>水平线标签```
         ```html
         <body>
         <p>段落标签</p>
         <hr>
         <p>段落标签</p>
         </body>
         ```
         ![水平线标签](./media/水平线标签.jpg)
      - ```<br>换行标签```
         ```html
         <body>
         <p>段落标签</p>
         <br><hr><br><hr><br>
         <p>段落标签</p>
         </body>
         ```
         ![换行标签](./media/换行标签.jpg)
   - 2. 标题标签
      - ```<h1>一级标题</h1>```
      - ```<h2>二级标题</h2>```
      - ```<h3>三级标题</h3>```
      - ```<h4>四级标题</h4>```
      - ```<h5>五级标题</h5>```
      - ```<h6>六级标题</h6>```
         ```html
         <body>
            <h1>一级标题</h1>
            <h2>二级标题</h2>
            <h3>三级标题</h3>
            <h4>四级标题</h4>
            <h5>五级标题</h5>
            <h6>六级标题</h6>
         </body>
         ```
         ![标题标签](./media/标题标签.jpg)
   - 3. 文本格式化标签
      - ```<strong>加粗</strong>||<b>加粗</b>```
         ```html
         <body>
            <strong>加粗</strong>
            <b>加粗</b>
         </body>
         ```
         ![加粗标签](./media/加粗标签.jpg)
      - ```<em>倾斜</em>||<i>倾斜</i>```
         ```html
         <body>
            <em>倾斜</em>
            <i>倾斜</i>
         </body>
         ```
         ![倾斜标签](./media/倾斜标签.jpg)
      - ```<ins>下划线</ins>||<u>下划线</u>```
         ```html
         <body>
            <ins>下划线</ins>
            <u>下划线</u>
         </body>
         ```
         ![下划线标签](./media/下划线标签.jpg)
      - ```<del>删除线</del>||<s>删除线</s>```
         ```html
         <body>
            <del>删除线</del>
            <s>删除线</s>
         </body>
         ```
         ![删除线标签](./media/删除线标签.jpg)

## 标签属性

- 键值对
  ![属性code](./media/属性code.jpg)
  ![属性](./media/属性.jpg)

## 图片img

1. src=“pathname”
   - 相对路径
      - 上级目录
         ![上级目录](./media/上级目录.jpg)
         ![上级目录](./media/上级目录.gif)
      - 上级目录
         ![同级目录](./media/同级目录.jpg)
         ![同级目录](./media/同级目录.gif)
      - 下级目录
         ![下级目录](./media/下级目录.jpg)
         ![下级目录](./media/下级目录.gif)
   - 绝对路径
      - 下级目录
         ![绝对路径](./media/绝对路径.jpg)
         ![绝对路径](./media/绝对路径.gif)
2. alt=“文本替换”
   ![altjpg](./media/altjpg.jpg)
   ![alt](./media/alt.jpg)
3. title=“图片标题”
   ![title](./media/title.jpg)
   ![titlejpg](./media/titlejpg.jpg)

   ---
   原图
   ![srcjpg](./media/srcjpg.jpg)
   ![src](./media/src.jpg)
   ---
4. width=“宽度”
   ![widthjpg](./media/widthjpg.jpg)
   ![width](./media/width.jpg)
5. height=“高度”
   ![heightjpg](./media/heightjpg.jpg)
   ![height](./media/height.jpg)
6. width和height是可以一起设置的，但是容易让图片变形
   ![bothjpg](./media/bothjpg.jpg)
   ![both](./media/both.jpg)