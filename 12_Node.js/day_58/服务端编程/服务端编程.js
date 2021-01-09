const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()
app.listen(3006, () => console.log('OK'))

const storagePath = path.join(__dirname, 'books.json')

/* 图书列表 */
app.get('/api/getbooks', (req, res) => {

})

/* 添加图书 */
app.use(express.urlencoded({ extended: false }))
app.post('/api/addbook', (req, res) => {

})

/* 删除图书 */
app.get('/api/delbook', (req, res) => {

})