const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  categoryEngName: {
    type: String,
    required: true
  },
  categoryIcon: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Category', categorySchema)