# day03

## CSS（认识）

1. 层级样式表（cascading style sheets）

   - 行内式

     ```html
     <body>
         <div style=""></div>
     </body>
     ```

   - 内嵌式

   - ```html
     <head>
         <style>
     
         </style>
     </head>
     ```

   - 外链式

   - ```html
     <head>
         <link rel="stylesheet" href="">
     </head>
     ```

2. 基本语法

   ```html
   选择器{
   	属性：属性值；
   }
   ```

   ps：所有代码标点都属于`英文标点`

## 文字相关属性

1. font-style
   - normal---正常
   - italic---倾斜
2. font-weight
   - bold---粗体---700
   - normal---正常---400
3. font-size
   - 数字+px
4. font-family
   - 字体
   - 可以写多个，逗号隔开，浏览器匹配时从左往右，匹配不到就是默认字体
5. font连写
   - style weight size family
   - 上述顺序不能更改
   - style weight属性值可以省略
   - size family属性值不可以省略

##选择器（初识）

1. 标签选择器
   - 权重0，0，0，1
   - 选择所有与选择器名相同的元素
2. 类选择器
   - 权重0，0，1，0
   - 选择与class属性值相同的元素
3. id选择器
   - 权重0，1，0，0
   - 选择与id属性值相同的元素
4. 通配符选择器
   - `*`
   - 选择所有元素