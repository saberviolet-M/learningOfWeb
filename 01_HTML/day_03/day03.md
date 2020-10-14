# day03

## 表单（详）

### input表单属性

1. type = “ ”

   - text

     - 1. 文本框

       2. 默认属性

       3. 输入为单行显示

       4. ps：`如果type属性值拼写出错，则会显示为默认的文本框`

          ```html
          <body>
              性别：
              <input type="radio" name="sexual">男
              <input type="radi" name="sexual">女
          </body>
          ```

          ![属性值输错](D:\1_2020Web\Note\01_HTML\day_03\media\属性值输错.jpg)

   - password

     - 1. 密码文本框
       2. 输入内容以“密文”形式显示
       3. 显示为单行文本

   - radio

     - 1. 单选框

       2. 配合name属性值可以进行分组，name属性值相同的radio按钮只能选取其中一个

          ```html
          <body>
              性别：
              <input type="radio" name="sexual">男
              <input type="radio" name="sexual">女
          </body>
          ```

          ![单选按钮](D:\1_2020Web\Note\01_HTML\day_03\media\单选按钮.gif)

       3. 配合checked属性可以实现默认选中

          ```html
          <body>
              性别：
              <input type="radio" name="sexual">男
              <input type="radio" name="sexual">女
          </body>
          ```

          ![radio无默认](D:\1_2020Web\Note\01_HTML\day_03\media\radio无默认.jpg)

          ```html
          <body>
              性别：
              <input type="radio" name="sexual">男
              <input type="radio" name="sexual" checked>女
          </body>
          ```

          ![radio默认](D:\1_2020Web\Note\01_HTML\day_03\media\radio默认.jpg)

   - checkbox

     - 1. 复选框
       2. 同上添加checked属性可以设置默认显示

   - 按钮属性值（配合`<form></form>`表单域使用）

     - button

       - 普通按钮---没啥功能

       - 配合value属性可以添加内容

         ```html
         <body>
             button按钮
             <input type="button">
             <br>
             <input type="button" value="button按钮">
         </body>
         ```

         ![button](D:\1_2020Web\Note\01_HTML\day_03\media\button.jpg)

     - submit

       - 提交表单域中的name和value到后台

         ```html
         <body>
             <form>
                 性别：
                 <input type="radio" value=“man” name="sexual">男
                 <input type="radio" value=“woman” name="sexual" checked>女
                 <br>
                 <input type="submit">
             </form>
         </body>
         ```

         ![submit](D:\1_2020Web\Note\01_HTML\day_03\media\submit.gif)

       - 同上可以通过value属性修改按钮内容

         ```html
         <body>
             <input type="submit">
             <br>
             <input type="submit" value="button按钮">
         </body>
         ```

         ![submit](D:\1_2020Web\Note\01_HTML\day_03\media\submit.jpg)

     - reset

       - 重置按钮

       - 可以恢复默认属性

       - 可以配合value属性修改按钮内容

         ```html
         <body>
             <form>
                 性别：
                 <input type="radio" value=“man” name="sexual">男
                 <input type="radio" value=“woman” name="sexual" checked>女
                 <br>
                 <input type="reset" value="这是一个重置按钮">
             </form>
         </body>
         ```

         ![reset](D:\1_2020Web\Note\01_HTML\day_03\media\reset.gif)

     - image

       - 将图片设置为按钮

       - 需要配合src属性设置pathname路径名

       - 具备提交属性

         ```html
         <body>
             <form>
                 性别：
                 <input type="radio" value=“man” name="sexual">男
                 <input type="radio" value=“woman” name="sexual" checked>女
                 <br>
                 <input type="image" src="./01_HTML/day_03/media/btn.jpg">
             </form>
         </body>
         ```

         ![image](D:\1_2020Web\Note\01_HTML\day_03\media\image.gif)

2. value

   - 作为交给后台的数据存在

3. name

   - 和value配对出现，name属性值 = value属性值

### label标签

1. 用于扩大表单控件的点击范围

2. 用法：

   - 1. 直接包含input标签和说明文字

        ```html
        <body>
            <form>
                性别：
                <label>
                <input type="radio" value=“man” name="sexual">男
                </label>
                <label>
                <input type="radio" value=“woman” name="sexual">女
                </label>
            </form>
        </body>
        ```

        ![label1](D:\1_2020Web\Note\01_HTML\day_03\media\label1.gif)

   - 2. 只包含描述性文字

        - input标签中添加id属性

        - 在label标签中添加for属性，属性值等同于id属性值

          ```html
          <body>
              <form>
                  性别：
                  <input type="radio" id="man" value=“man” name="sexual">
                  <label for="man">男
                  </label>
                  <input type="radio" id="woman" value=“woman” name="sexual">
                  <label for="woman">女
                  </label>
              </form>
          </body>
          ```

          ![label2](D:\1_2020Web\Note\01_HTML\day_03\media\label2.gif)

### select下拉列表

1. 需要配合`<option></option>标签使用`

2. 可以为`option`标签添加`selected`属性使其变成默认选项

   ```html
   <body>
       <select>
           <option >亚丝娜</option>
           <option >蕾姆</option>
           <option selected>--请选择你喜欢的**--</option>
           <option >saber</option>
           <option >violet</option>
       </select>
   </body>
   ```

   ![select](D:\1_2020Web\Note\01_HTML\day_03\media\select.gif)

### textarea文本域

1. 类似评论区多使用此文本域标签

2. 可以通过`cols`和`rows`设置文本域标签的行宽和列宽

3. 输入内容可多行显示

   ```html
   <body>
       <textarea cols="30" rows="10"></textarea>
   </body>
   ```

   ![textarea](D:\1_2020Web\Note\01_HTML\day_03\media\textarea.gif)



### 无语义标签

1. div
   - 块级元素标签
   - 独自占据一行
   - 内容决定盒子高度
   - 内部可以放置任意元素
2. span
   - 行内元素标签
   - 一行可以放置多个
   - 内容决定盒子宽度和高度
   - 内部不能放置块级元素

