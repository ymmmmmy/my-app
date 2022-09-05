const express = require('express')
const app = express()
const menu = require('./routers/menu')
const main = require('./routers/main')
const area = require('./routers/area')
const upload = require('./routers/upload')
const user = require('./routers/user')
const bodyParser = require('body-parser')

app.use(express.static('./data'))

app.use(bodyParser.json())
app.use('/api/menu', menu)
app.use('/api/main', main)
app.use('/api/area', area)
app.use('/api/upload', upload)
app.use('/api/user', user)


app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status('500').send('服务端出错了！')
})

app.listen('3040', function () {
    console.log('服务器正在监听3040端口');
})