const express = require('express')
const sqlFn = require('../mysql')
const remove = require('lodash/remove')

const router = express.Router()


router.post('/add', function (req, res, next) {
    const sql = 'insert into menu values (null,?,?,?,?,?,?)'
    const { pid = -1, name, linkUrl, openType, icon, isOfAdmin } = req.body
    const arr = [pid, name, linkUrl, openType, icon, isOfAdmin]
    sqlFn(sql, arr, function (err, data) {
        if (err) {
            next(err)
            return
        }
        if (data.affectedRows) {
            res.send({ code: '00000', success: true })
        }
    })
})

router.get('/list', function (req, res, next) {
    const sql = 'select * from menu'
    sqlFn(sql, [], function (err, data) {
        if (err) {
            next(err)
            return
        }

        const getMenuTree = (menus = []) => {
            menus.map(item => {
                menus.map(menu => {
                    if (item.pid == menu.id) {
                        menu.children = menu.children || []
                        menu.children.push(item)
                    }
                })
            })
            remove(menus, (menu) => menu.pid != -1)
            return menus
        }
        res.send({ code: '00000', records: getMenuTree(data) })
    })
})

router.get('/getMenuName', function (req, res, next) {
    const sql = 'select * from menu where `id`=?'
    sqlFn(sql, [req.query.id], function (err, data) {
        if (err) {
            next(err)
            return
        }
        res.send({ code: '00000', record: data[0] })
    })
})

router.post('/update', function (req, res, next) {
    const sql = 'update menu set `name`=?,`linkUrl`=?,`openType`=?,`icon`=?,`isOfAdmin`=? where `id`=?'
    const { name, linkUrl, openType, icon, isOfAdmin, id } = req.body
    sqlFn(sql, [name, linkUrl, openType, icon, isOfAdmin, id], function (err, data) {
        if (err) {
            next(err)
            return
        }
        if (data.affectedRows) {
            res.send({ code: '00000', success: true })
        }
    })
})

router.post('/delete', function (req, res, next) {
    const sql = 'select * from menu where `pid`=?'
    sqlFn(sql, [req.body.id], function (err, data) {
        if (err) {
            next(err)
            return
        }
        if (data && data.length) {
            res.send({ code: '-1', message: '该菜单不能删除，请先删除它的字菜单！' })
        } else {
            const sql = ' delete from menu where `id`=?'
            sqlFn(sql, [req.body.id], function (err, data) {
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


module.exports = router
