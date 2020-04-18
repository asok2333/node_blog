const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./router')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))
//bodyParser（post请求题 解析）一定在路由前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

app.listen(3000, function () {
    console.log('running....')
})
