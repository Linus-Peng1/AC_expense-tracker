const mongoose = require('mongoose')
const Category = require('../category')

mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true })

const category = [
  {
    categoryName: '家居物業',
    categoryEngName: 'home',
    categoryIcon: 'fas fa-home'
  },
  {
    categoryName: '交通出行',
    categoryEngName: 'transportation',
    categoryIcon: 'fas fa-shuttle-van'
  },
  {
    categoryName: '休閒娛樂',
    categoryEngName: 'entertainment',
    categoryIcon: 'fas fa-grin-beam'
  },
  {
    categoryName: '餐飲食品',
    categoryEngName: 'food',
    categoryIcon: 'fas fa-utensils'
  },
  {
    categoryName: '其他',
    categoryEngName: 'others',
    categoryIcon: 'fas fa-pen'
  }
]

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Category.create(category)
    .then(() => {
      console.log('insert category done...')
      return db.close()
    })
    .then(() => {
      console.log('database connection close...')
    })
})