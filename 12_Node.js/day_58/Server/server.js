// 加载跨域插件
const cors = require('cors')

// 加载文件模块
const fs = require('fs')

// 加载路径模块
const path = require('path')

// 加载express模块构建服务器
const express = require('express')
const app = express()
app.listen(3000, () => console.log('OK'))

//模拟数据存储，json文件存储数据，路径 
const storagePath = path.join(__dirname, 'bookData.json')

// 应用级配置
app.use(cors())

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