const express = require('express')
const sqlFn = require('../mysql')
const router = express.Router()

router.post('/add', function (req, res, next) {
    const sql = 'select * from user where locate(?,account)>0'
    sqlFn(sql, [req.body.account], function (err, data) {
        if (err) {
            next(err)
            return
        }
        if (data && data.length) {
            res.send({ code: '-1', message: '该账号已存在' })
        } else {
            const sql = 'insert into user values (null,?,?,?,?,?,?)'
            const { name, account, area, tel, email, picture } = req.body
            sqlFn(sql, [name, account, area, tel, email, picture], function (err, data) {
                if (err) {
                    next(err)
                    return
                }
                if (data.affectedRows) {
                    res.send({ code: '00000', success: true })
                }
            })
        }

    })
})

router.get('/list',function(req,res,next){
    const sql=`select * from user ${req.query.name?'where locate(?,name)>0':''}`
    sqlFn(sql,[req.query.name],function(err,data){
        if(err){
            next(err)
            return
        }
        res.send({code:'00000',records:data})
    })
})

module.exports = router