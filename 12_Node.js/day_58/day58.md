# day58

## 案例（书籍接口）

### 接口文档

> **本地服务器：**
>
> http://localhost:3000

#### 服务端编程

```js
// 加载文件模块
const fs = require('fs')
// 加载路径模块
const path = require('path')
// 加载express模块构建服务器
const express = require('express')
const app = express()
app.listen(3000, () => console.log('OK'))

//模拟数据存储，json文件存储数据，路径 
const storagePath = path.join(__dirname, 'books.json')
```

#### 图书列表

+ 接口URL：  /api/getbooks
+ 调用方式： GET
+ 参数格式：

| 参数名称  | 参数类型 | 是否必选 | 参数说明 |
| --------- | -------- | -------- | -------- |
| id        | Number   | 否       | 图书Id   |
| bookname  | String   | 否       | 图书名称 |
| author    | String   | 否       | 作者     |
| publisher | String   | 否       | 出版社   |

+ 响应格式：

| 数据名称    | 数据类型 | 说明                     |
| ----------- | -------- | ------------------------ |
| status      | Number   | 200 成功；500 失败；     |
| msg         | String   | 对 status 字段的详细说明 |
| data        | Array    | 图书列表                 |
| + id        | Number   | 图书Id                   |
| + bookname  | String   | 图书名称                 |
| + author    | String   | 作者                     |
| + publisher | String   | 出版社                   |

+ 返回示例：

```json
{
  "status": 200,
  "msg": "获取图书列表成功",
  "data": [
    { "id": 1, "bookname": "西游记", "author": "吴承恩", "publisher": "北京图书出版社" },
    { "id": 2, "bookname": "红楼梦", "author": "曹雪芹", "publisher": "上海图书出版社" },
    { "id": 3, "bookname": "三国演义", "author": "罗贯中", "publisher": "北京图书出版社" }
  ]
}

```

#### api接口

```js
/* 图书列表 */
app.get('/api/getbooks', (req, res) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        // 错误返回
        if (err) {
            res.send({
                status: '500',
                msg: '失败'
            })
        }
        // 解析JSON字符串
        data = JSON.parse(data)
        // 成功返回
        res.json({
            "status": 200,
            "msg": "获取图书列表成功",
            "data": data
        })
    })
})
```

#### 添加图书

+ 接口URL：  /api/addbook
+ 调用方式： POST
+ 参数格式：

| 参数名称  | 参数类型 | 是否必选 | 参数说明 |
| --------- | -------- | -------- | -------- |
| bookname  | String   | 是       | 图书名称 |
| author    | String   | 是       | 作者     |
| publisher | String   | 是       | 出版社   |

+ 响应格式：

| 数据名称 | 数据类型 | 说明                         |
| -------- | -------- | ---------------------------- |
| status   | Number   | 201 添加成功；500 添加失败； |
| msg      | String   | 对 status 字段的详细说明     |

+ 返回示例：

```json
{
    "status": 201,
    "msg": "添加图书成功"
}
```

#### api接口

```js
/* 添加图书 */
// 应用级配置，在post时配置
app.use(express.urlencoded({ extended: false }))
app.post('/api/addbook', (req, res) => {
    // 获取请求体内的参数数据
    let reqData = req.body
    // 时间戳做id
    reqData.id = Date.now()
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            return res.send({
                "status": 500,
                "msg": "添加图书失败"
            })
        }
        data = JSON.parse(data)
        // 追加数据内容
        data.push(reqData)
        // 
        fs.writeFile(storagePath, JSON.stringify(data, null, 4), (err) => {
            if (err) {
                res.send({
                    "status": 500,
                    "msg": "添加图书失败"
                })
            } else {
                res.send({
                    "status": 201,
                    "msg": "添加图书成功"
                })
            }
        })
    })
})
```

#### 删除图书

+ 接口URL：  /api/delbook
+ 调用方式： GET
+ 参数格式：

| 参数名称 | 参数类型 | 是否必选 | 参数说明 |
| -------- | -------- | -------- | -------- |
| id       | Number   | 是       | 图书Id   |

+ 响应格式：

| 数据名称 | 数据类型 | 说明                                                         |
| -------- | -------- | ------------------------------------------------------------ |
| status   | Number   | 200 删除成功；500 未指定要删除的图书Id；501 执行Sql报错；502 要删除的图书不存在； |
| msg      | String   | 对 status 字段的详细说明                                     |

+ 返回示例：

```json
{
    "status": 200,
    "msg": "删除图书成功！"
}
```

```js
/* 添加图书 */
// 应用级配置，在post时配置
app.use(express.urlencoded({ extended: false }))
app.post('/api/addbook', (req, res) => {
    // 获取请求体内的参数数据
    let reqData = req.body
    // 时间戳做id
    reqData.id = Date.now()
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            return res.send({
                "status": 500,
                "msg": "添加图书失败"
            })
        }
        data = JSON.parse(data)
        // 追加数据内容
        data.push(reqData)
        // 
        fs.writeFile(storagePath, JSON.stringify(data, null, 4), (err) => {
            if (err) {
                res.send({
                    "status": 500,
                    "msg": "添加图书失败"
                })
            } else {
                res.send({
                    "status": 201,
                    "msg": "添加图书成功"
                })
            }
        })
    })
})

/* 删除图书 */
app.get('/api/delbook', (req, res) => {
    // 通过id查找书籍删除
    const reqId = req.query.id
    // 没有id传递或者id没有传递数值
    if (reqId == '' || reqId == undefined) {
        return res.send({
            "status": 500,
            "msg": "未指定要删除的图书Id"
        })
    }
    // 读取json文件数据
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            return res.send({
                "status": 501,
                "msg": "执行Sql报错"
            })
        }
        // 解析数据
        data = JSON.parse(data)
        // 存下长度以判断是否找到匹配项
        const dataLength = data.length
        // 数组方法剔除id匹配项
        data = data.filter(item => item.id != reqId)
        // 如果没有删除项则返回图书不存在
        if (dataLength == data.length) {
            return res.send({
                "status": 502,
                "msg": "要删除的图书不存在"
            })
        }
        // 删除结束重新写入json文件
        fs.writeFile(storagePath, JSON.stringify(data, null, 4), (err) => {
            if (err) {
                res.send({
                    "status": 501,
                    "msg": "执行Sql报错"
                })
            } else {
                res.send({
                    "status": 200,
                    "msg": "删除图书成功"
                })
            }
        })
    })
})
```

### 使用第三方模块实现跨域资源共享

实现跨域资源共享，可以使用一个叫做  cors 的第三方模块。推荐使用它来实现跨域资源共享。

使用方法：

- 下载安装cors   `npm i cors`

- `const cors = require('cors')`  --- 加载模块

- `app.use(cors())`  --  使用use方法即可

## 路由

## MySQL

