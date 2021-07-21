const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Record = require('./models/record')
const Category = require('./models/category')

const PORT = 3000

const app = express()

app.engine('hbs', exphbs({
  defaultLayput: 'main',
  extname: '.hbs',
  helpers: require('./utils/handlebarsHelpers')
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/expense-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))
  .catch(error => console.log(error))

// create new record
app.get('/records/new', (req, res) => {
  res.render('new', { categories })
})

app.post('/records', (req, res) => {
  const { name, category, date, amount } = req.body
  if (!name || !category || !date || !amount) {
    return res.redirect('/records/new')
  }
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// edit the record
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record, categories }))
    .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, category, date, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete record
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// home page
app.get('/', (req, res) => {
  const categoryIcons = {}
  const selectedCategory = req.query.categorySelect
  let totalAmount = 0

  Category.find()
    .lean()
    .then(category => {
      category.forEach(item => {
        categoryIcons[item.categoryName] = item.categoryIcon
      })
    })
    .then(() => {
      Record.find()
        .lean()
        .then(records => {
          records.forEach(record => record['icon'] = categoryIcons[record.category])
          if (selectedCategory) {
            records = records.filter(record => record.category === selectedCategory)
          }
          records.forEach(record => totalAmount += record.amount)
          res.render('index', { records, categories, selectedCategory, totalAmount })
        })
    })
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})