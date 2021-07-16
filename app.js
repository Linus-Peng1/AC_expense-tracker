const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const PORT = 3000

const app = express()

app.engine('hbs', exphbs({ defaultLayput: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})