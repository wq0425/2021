let express = require('express');
let fs = require('fs');
let path = require('path');
let app = express();
let bodyParser = require('body-parser');
const router = require('./router')

// 配置body-parser中间件，专门解析post请求体
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/public/', express.static('./public'))
app.use('/node_modules/', express.static('./node_modules'))
// view engine setup
app.engine('html', require('express-art-template'));

require('./plugins/db')()

app.use(router)

app.listen('3000', function () {
    console.log('localhost:3000')
})