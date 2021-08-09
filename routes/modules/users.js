const express = require('express')
const router = express.Router()

// 使用者登入
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

// 使用者註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {

})

module.exports = router