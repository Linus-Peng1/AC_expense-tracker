const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const Record = require('./models/record')
const Category = require('./models/category')

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
  const categories = {}
  Category.find()
    .lean()
    .then(category => {
      category.forEach(item => categories[item.categoryName] = item.categoryIcon)
    })

  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => record['icon'] = categories[record.category]
      )
      res.render('index', { records })
    })
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})