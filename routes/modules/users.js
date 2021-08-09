const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

// 使用者登入
router.get('/login', (req, res) => {
  res.render('login')
})

// Passport 提供的 authenticate 方法執行認證。
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// 使用者註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      res.render('register', { errors, name, email, password, confirmPassword })
    }
    return bcrypt
      .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
      .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
      .then(hash =>
        User.create({ name, email, password: hash })
      )
      .then(() => { res.redirect('/') })
      .catch(err => console.log(err))
  })
})

// 使用者登出
router.get('/logout', (req, res) => {
  req.logout() // 是 Passport.js 提供的函式，會清除 session。
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router