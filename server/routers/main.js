const express = require('express')
const router = express.Router()
const sqlFn = require('../mysql')
const remove = require('lodash/remove')


router.get('/menuList',function(req,res,next){
    const sql='select * from menu'
    sqlFn(sql,[],function(err,data){
        if(err){
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
        res.send({code:'00000',records:getMenuTree(data)})
    })
})

module.exports = router