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
  const selectedCategory = req.query.categorySelect
  const selectedMonth = req.query.monthSelect
  const category = selectedCategory ? selectedCategory : { $ne: '' } // ne: not equal
  const month = Number(selectedMonth) ? Number(selectedMonth) : { $ne: '' }
  const userId = req.user._id
  let totalAmount = 0

  Record
    .aggregate([
      { '$project': { 'name': 1, 'userId': 1, 'category': 1, 'date': 1, 'amount': 1, 'merchant': 1, 'month': { $month: '$date' } } },
      { '$match': { userId, category, month } },
      {
        '$facet': {
          recordResults: [{ '$match': { userId, category, month } }],
          totalCount: [{ '$group': { '_id': null, 'total': { '$sum': '$amount' } } }]
        }
      }
    ])
    .then(results => {
      const records = results[0].recordResults
      console.log(records)
      if (records.length) {
        totalAmount = results[0].totalCount[0].total
      }
      records.forEach(record => {
        record['icon'] = getCategoryIcon(record.category, categories) // add category icon
      })
      res.render('index', { records, categories, selectedCategory, selectedMonth, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router
