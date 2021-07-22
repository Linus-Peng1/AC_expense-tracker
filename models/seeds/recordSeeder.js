const mongoose = require('mongoose')
const Record = require('../record')
const db = require('../../config/mongoose')

const data = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021-07-16',
    amount: 60
  },
  {
    name: '晚餐',
    category: '餐飲食品',
    date: '2021-07-16',
    amount: 60
  },
  {
    name: '捷運',
    category: '交通出行',
    date: '2021-07-16',
    amount: 120
  },
  {
    name: '電影:黑寡婦',
    category: '休閒娛樂',
    date: '2021-07-15',
    amount: 220
  },
  {
    name: '租金',
    category: '家居物業',
    date: '2021-06-01',
    amount: 25000
  }
]

db.once('open', () => {
  Record.create(data)
    .then(() => {
      console.log('insert record done...')
      return db.close()
    })
    .then(() => {
      console.log('database connection close...')
    })
})