const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

// 使用者登入
router.get('/login', (req, res) => {
  res.render('login')
})

// Passport 提供的 authenticate 方法執行認證。
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 使用者註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', { name, email, password, confirmPassword })
    } else {
      User.create({ name, email, password })
        .then(() => { res.redirect('/') })
        .catch(err => console.log(err))
    }
  })
})

// 使用者登出
router.get('/logout', (req, res) => {
  req.logout() // 是 Passport.js 提供的函式，會清除 session。
  res.redirect('/users/login')
})

module.exports = router