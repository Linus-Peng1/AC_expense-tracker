const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const { getCategoryIcon } = require('../../utils/getCategoryIcon')

const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))

// home page
router.get('/', (req, res) => {
  const categoryIcons = {}
  let totalAmount = 0
  const userId = req.user._id

  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount // 統計總金額
        record['icon'] = getCategoryIcon(record.category, categories) // 在 record 物件裡建立 "icon"
      })
      res.render('index', { records, categories, totalAmount })
    })
    .catch(error => console.log(error))
})

// filter page
router.get('/filter', (req, res) => {
  const selectedCategory = req.query.categorySelect
  const selectedMonth = req.query.monthSelect
  let totalAmount = 0
  const userId = req.user._id

  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      // 依類別篩選
      if (selectedCategory) {
        records = records.filter(record => record.category === selectedCategory)
      }
      // 依月份篩選
      if (selectedMonth) {
        records = records.filter(record => (record.date.getMonth() + 1) === Number(selectedMonth))
      }

      records.forEach(record => {
        totalAmount += record.amount // 統計總金額
        record['icon'] = getCategoryIcon(record.category, categories) // 在 record 物件裡建立 "icon"
      })
      res.render('index', { records, categories, selectedCategory, selectedMonth, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router
