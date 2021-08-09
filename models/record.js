const mongoose = require('mongoose')
const user = require('./user')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  merchant: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId, // 定義 userId 這個項目是一個 ObjectId，也就是它會連向另一個資料物件
    ref: 'User', // 定義參考對象是 User model
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)