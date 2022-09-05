const express = require('express')
const router = express.Router()
const sqlFn = require('../mysql')

router.get('/province', function (req, res, next) {
    const sql = 'select * from province'
    sqlFn(sql, [], function (err, data) {
        if (err) {
            next(err)
            return
        }
        res.send({ code: '00000', records: data })
    })
})

router.get('/city', function (req, res, next) {
    const sql = 'select * from city where `pid`=?'
    sqlFn(sql, [req.query.pid], function (err, data) {
        if (err) {
            next(err)
            return
        }
        res.send({ code: '00000', records: data })
    })
})

router.get('/region', function (req, res, next) {
    const sql = 'select * from region where `pid`=?'
    sqlFn(sql, [req.query.pid], function (err, data) {
        if (err) {
            next(err)
            return
        }
        res.send({ code: '00000', records: data })
    })
})

module.exports = router