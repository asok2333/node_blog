const express = require('express')
const md5 = require('blueimp-md5')
const User = require('./models/user')

var router = express.Router()

router.get('/', function (req, res) {
    res.render('index.html')
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {

})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', async function (req, res) {
    console.log(req.body)
    let body = req.body
    try {
        if (await User.findOne({ email: body.e,email })) {
            return res.status(200).json({
                code: 201,
                msg: '邮箱已存在'
            })
        }
        if (await User.findOne({ nickname: body.e,nickname })) {
            return res.status(200).json({
                code: 201,
                msg: '用户名已存在'
            })
        }
        body.password = md5(md5(body.password))
        new User(body).save()
    } catch (err) {
        return res.status(500).json({
            code: 500,
            msg: err.message
        })
    }
    User.findOne({
        $or: [{
            email: body.email
        },{
            nickname: body.nickname
        }]
    }, function (err, data) {
        if(err) {
            return res.status(500).json({
                code: 500,
                msg: '服务器繁忙...'
            })
        }
        if (data) {
            return res.status(200).json({
                code: 201,
                msg: '该邮箱或用户名已被使用'
            })
        }
        body.password = md5(md5(body.password))
        new User(body).save(function (err, user) {
            if(err) {
                return res.status(500).json({
                    code: 500,
                    msg: '服务器繁忙...'
                })
            }
            res.status(200).json({
                code: 200,
                msg: '注册成功',
                data: user
            })
        })

    })
})
module.exports = router
