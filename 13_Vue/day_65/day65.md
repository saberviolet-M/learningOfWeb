# day64

## webpack

### webpack 中处理 less 文件

1. 下载依赖包

   注意: 解析less文件需要识别 less 语法, 所以除了 `less-loader`  需要额外下载 `less` 包  

   less-loader: 将less转换成 css

   ```
   yarn add less  less-loader  -D
   ```

2. 配置

   ```js
   // 配置 less 文件的解析
   {
     test: /\.less$/,
     use: [
       // 分离出 css 内容
       {
         loader: MiniCssExtractPlugin.loader,
         options: {
             publicPath:'../',
         },
       }, 
       'css-loader',
       'less-loader' 
     ]
   }
   ```

### webpack 中处理图片 - url-loader

**注意: `url-loader` 中的部分功能要用到 `file-loader`,  要下载两个模块**

1. 下载依赖包

   ```
   yarn add url-loader file-loader -D
   ```

2. 配置loader

   图片转成 base64 字符串,  

   - 好处就是浏览器不用发请求了，直接可以读取
   - 坏处就是如果图片太大，再转`base64`就会让图片的体积增大 30% 左右, 得不偿失

   所以需要通过 options 配置选项进行配置 limit, 可以设置一个临界值, 大于这个值会整个文件直接打包到目录中, 得到是路径,

   如果小于这个值, 就会转成 base64, 节约请求的次数

   ```js
   {
     test: /\.(png|jpg|gif|jpeg)$/i,
     use: [
       {
         loader: 'url-loader',
         // 配置了limit, 超过8k, 不转, 
         // 不到8k, 转base64字符串
         options: {
           limit: 8 * 1024,
         },
       },
     ],
   }
   ```


#### 配置图片的打包输出目录

默认是直接输出到了 dist 根目录, 可以通过 options 进行配置

```js
{
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        // 超过 8k 就不转 base64, 小于 8k 才转字符串
        limit: 8 * 1024,
        // 配置输出的文件名
        name: '[name].[ext]',
        // 配置静态资源的引用路径
        publicPath: "../images/",
        // 配置输出的文件目录
        outputPath: "images/"
      }
    }
  ]
}
```

#### webpack 配置字体图标 - url-loader 

字体图标 和 图片的配置一致

``` js
// 处理字体图标的解析
{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8 * 1024,
        // 配置输出的文件名
        name: '[name].[ext]',
        // 配置静态资源的引用路径
        publicPath: "../fonts/",
        // 配置输出的文件目录
        outputPath: "fonts/"
      }
    }
  ]
}
```

### webpack 使用 babel 处理高版本的 js 语法

webpack 默认仅内置了 模块化的 兼容性处理   `import  export`

babel 的介绍 => 用于处理高版本 js语法 的兼容性

  1. 安装包

     ```
     yarn add -D babel-loader @babel/core @babel/preset-env
     ```

  2. 配置规则

     ```js
     module: {
       rules: [
         {
           test: /\.js$/,
           exclude: /(node_modules|bower_components)/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env']
             }
           }
         }
       ]
     }
     ```

### webpack开发服务器

#### webpack-dev-server自动刷新

1. 下载

```
yarn add webpack-dev-server -D
```

2. 配置scripts

```js
scripts: {
	"build": "webpack --config webpack.config.js",
	"dev": "webpack serve --config webpack.config.js"
}
```

#### webpack-dev-server 的配置

```js
devServer: {
  port: 3000, // 端口号
  open: true // 自动打开浏览器
}
```

### source map 的说明 

#### 生产环境遇到的问题

前端项目在投入生产环境之前，都需要对 JavaScript 源代码进行压缩混淆，从而减小文件的体积，

提高文件的加载效率。此时就不可避免的产生了另一个问题：

对压缩混淆之后的代码除错（debug）是一件极其困难的事情

- 变量被替换成没有任何语义的名称
- 空行和注释被剔除

#### source map 介绍

Source Map 就是一个信息文件，里面储存着位置信息。

也就是说: Source Map 文件中 **存储着** 压缩混淆后代码 对应的 **转换前的位置**。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码，能够极大的方便后期的调试。

##### 开发环境的 source map

在开发环境下，webpack 默认启用了 Source Map 功能。

当程序运行出错时，可以直接在控制台提示错误行的位置，并定位到具体的源代码：

**但是, 默认的行数不对应, 加上如下配置即可解决行数不对应的问题**

```jsx
module.exports = {
  ...,
  
  mode: 'development',
  // eval-source-map 开发模式下使用, 保证运行时的行数 和 源代码行数 一致
  devtool: 'eval-source-map',
  
  ...
}
```

##### 生产环境的 source map

在生产环境下，如果省略了 devtool 选项，则最终生成的文件中不包含 Source Map。

这能够防止原始代码通过 Source Map 的形式暴露给别有所图之人。

1. 在生产环境下，如果只想 **定位报错的具体行数，且不想暴露源码**。 (推荐)

   此时可以将devtool 的值设置为  nosources-source-map

   ```jsx
   devtool: 'nosources-source-map',
   ```

2. 在生产环境下，如果想在定位报错行数的同时，展示具体报错的源码。

   此时可以将 devtool 的值设置为 source-map。

   ```jsx
   devtool: 'source-map',
   ```

## Vue（初）

### 开发vue有两种方式

+ 传统开发模式：基于html/css/js文件开发vue
+ 工程化开发方式：在webpack环境中开发vue，这是最推荐的方式。现代化的项目也都是在webpack环境下进行开发的。

### vue-cli的使用

> `vue-cli`也叫vue脚手架,`vue-cli`是vue官方提供的一个全局命令工具，这个命令可以帮助我们快速的创建一个vue项目的基础架子。

- 全局安装命令

  ```bash
  npm install -g @vue/cli
  # OR
  yarn global add @vue/cli
  ```

- 查看版本`vue`

  ```bash
  vue --version
  ```

- 初始化一个vue项目

  ```bash
  vue create 项目名
  ```

### 如何覆盖webpack配置

> 项目无法找到webpack.config.js文件，因为vue把它隐藏
>
> 如果需要覆盖webpack的配置，可以创建一个vue.config.js文件，覆盖webpack配置文件

```js
/* 覆盖webpack的配置 */
module.exports = {
  devServer: {
    open: true,
    port: 3000
  }
}
```

### vue单文件组件的说明

一个`.vue`文件就是一个组件,后续开发vue，所有的功能都是基于组件实现。

一个单文件组件由三部分构成

+ **template(必须) ** 影响组件渲染的结构  html
  + 只能有一个根元素
+ **script：**逻辑   js
+ **style：**样式   css less scss
  + style用于提供组件的样式，默认只能用css
  + 可以通过`lang="less"`开启less的功能，需要安装依赖包