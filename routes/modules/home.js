const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))

// home page
router.get('/', (req, res) => {
  const categoryIcons = {}
  const selectedCategory = req.query.categorySelect
  const selectedMonth = req.query.monthSelect
  let totalAmount = 0

  // 處理 categoryIcons 物件
  Category.find()
    .lean()
    .then(category => {
      category.forEach(item => {
        categoryIcons[item.categoryName] = item.categoryIcon
      })
    })
    .then(() => {
      // 處理 record 物件
      Record.find()
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          records.forEach(record => record['icon'] = categoryIcons[record.category]) // 在 record 物件裡建立 "icon"

          // 依類別篩選
          if (selectedCategory) {
            records = records.filter(record => record.category === selectedCategory)
          }

          // 依月份篩選
          if (selectedMonth) {
            records = records.filter(record => (record.date.getMonth() + 1) === Number(selectedMonth))
          }

          records.forEach(record => totalAmount += record.amount) // 統計總金額
          res.render('index', { records, categories, selectedCategory, selectedMonth, totalAmount })
        })
    })
    .catch(error => console.log(error))
})

module.exports = router