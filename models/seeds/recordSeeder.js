const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  record: [
    { name: '午餐', category: '餐飲食品', date: '2021-07-16', amount: 180, merchant: '肯德基' },
    { name: '晚餐', category: '餐飲食品', date: '2021-07-16', amount: 60, merchant: '自助餐' },
    { name: '晚餐', category: '餐飲食品', date: '2021-08-10', amount: 250, merchant: '一蘭拉麵' },
    { name: '捷運', category: '交通出行', date: '2021-07-16', amount: 120, merchant: '捷運' },
    { name: '電影:黑寡婦', category: '休閒娛樂', date: '2021-07-15', amount: 220, merchant: '威秀影城' },
    { name: '租金', category: '家居物業', date: '2021-08-01', amount: 25000, merchant: '房東' }
  ]
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      const record = SEED_USER.record

      return Promise.all(Array.from(
        { length: record.length },
        (_, i) => Record.create({
          name: record[i].name,
          category: record[i].category,
          date: record[i].date,
          amount: record[i].amount,
          merchant: record[i].merchant,
          userId: userId
        })
      ))
    })
    .then(() => {
      console.log('insert record done.')
      return db.close()
    })
    .catch(error => console.log(error))
})