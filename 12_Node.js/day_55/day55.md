# day55

## Node.js

### JavaScript解析引擎

- Chrome---V8
- Firefox---OdinMonkey
- Safri---JScore
- IE---Chakra
- ……

### 什么是Node.js

> 基于Chrome	V8引擎的JavaScript**运行环境**

### Node.js可以做什么

- 基于 Express 框架（http://www.expressjs.com.cn/），可以快速构建Web 应用
-  基于 Electron框架（https://electronjs.org/），可以构建跨平台的桌面应用
- 基于 restify 框架（http://restify.com/），可以快速构建API 接口项目

### 学习路线

- JavaScript语法
- 内置API（fs、path、http……）
- 第三方API模块（express、mysql……）

### 在 Node.js 环境中执行 JavaScript 代码

#### REPL（了解）

> REPL （英语：Read - Eval - Print - Loop，简称REPL）是一个简单的，交互式的编程环境。它和浏览器调试工具中的 console 面板 比较类似，我们可以通过REPL，来执行一些简单的Javascript 代码。

- REPL 中每个字母所代表的含义分别是读取 - 求值 - 输出 - 循环
  - R（Read）：每当我们输入完毕代码之后敲击回车键，Node.js 环境就会读取用户输入的代码
  - E（Eval）：把Read 进来的用户代码，进行解析和执行
  - P（Print）：把第二步中解析执行的结果，输出给用户
  - L（Loop）：当输出完毕之后，进入下一次的REP 循环，等待用户 输入新的代码

#### 命令行（推荐方式）

- 打开终端
- 输入 node 要执行的js文件的路径，即可通过Node.js，来执行存放于.js 文件中的代码

#### 命令行中的快捷键

- 使用 ↑ 键，可以快速定位到上一次执行的命令

- 使用 tab 键，能够快速补全路径
- 使用 esc 键，能够快速清空当前已输入的命令
- powershell，输入 clear命令，可以清空终端。 cmd中要用 cls

#### 三个简单且重要的终端命令 

- ls
  - list 查看 ，查看当前文件夹下所有的目录列表
- cd
  - 切换到某个文件夹下，  change directory
- cd ../
  - 退回上级文件夹

### global模块

> 在node.js中global模块是全局模块，调用时可以省略global

#### __dirname

>  绝对路径

#### 引入

> ```js
> const fs = require('fs')
> ```

### fs 文件系统模块

> fs 模块是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。
>
> 如果要在 JavaScript 代码中，使用 fs 模块来操作文件，则需要使用如下的方式先导入它`const fs = reuire('fs')`

 #### fs.readFile() 方法，用来读取指定文件中的内容

```js
fs.readFile(path[, options], callback)
```

- 参数1：**必选参数**，需要指定一个文件路径的**字符串**，表示要读取哪个**路径**对应的文件。
- 参数2：**可选参数**，表示以什么编码格式来读取文件。
  - utf8/utf-8 同样有效
- 参数3：**必选参数**，文件读取完成后，通过回调函数拿到读取的结果。 
  - 回调函数参数
  - 参数1---err：错误信息
  - 参数2---data：读取到的数据
  - PS：读文件默认会读出一个文件流，可以通过toString方法把文件流转换成字符串；也可以通过参数2设置编码格式

> [Sync---同步]
>
> [async---异步]
>
> fs.readFile()方法为异步，存在同步方法fs.readFileSync()

#### fs.writeFile() 方法，用来向指定的文件中写入内容

```js
fs.writeFile(file, data[, options], callback)
```

- 参数1：**必选参数**，需要指定一个文件路径的**字符串**，表示要文件的存放**路径**。
- 参数2：**必选参数**，表示要写入的内容。
- 参数3：**可选参数**，表示以什么格式写入文件内容，默认值是utf8。
- 参数4：**必选参数**，文件写入完成后的回调函数。
- PS：
  - 写入文件是覆盖方式写入
  - 当文件不存在时会自动创建文件
  - 当目录（文件夹）不存在时会报错
    - code：‘ENOENT’
      - E（error）：错误
      - NO：没有
      - ENT（entity）：实体、存在
      - 路径存在问题，文件没有找到

#### fs.readdir()方法，读取指定目录下所有文件的名称

```js
fs.readdir(path[, options], callback)
```

- 参数1：**必选参数**，表示要读取哪个目录下的文件名称列表。
- 参数2：**可选参数**，以什么格式读取目录下的文件名称，默认值是utf8。
- 参数3：**必选参数**，读取完成以后的回调函数。
  - 回调函数参数
  - 参数1---err：错误信息
  - 参数2---data：读取到的数据

### path 路径模块

> path 模块是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理 需求。

#### path.join()

> 使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串

```js
path.join([...paths])
```

-  ...paths---路径片段的序列
-  返回值: **string**

#### path.basename()

> 使用 path.basename() 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名

```js
path.basename(path[,ext])
```

- path---必选参数，表示一个路径的字符串
- ext ---可选参数，表示可选的文件扩展名
- 返回: **string** 表示路径中的最后一部分

#### path.extname()

> 使用 path.extname() 方法，可以获取路径中的扩展名部分

```js
path.extname(path)
```

-  path ---必选参数，表示一个路径的字符串

- 返回: **string** 返回得到的扩展名字符串