const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes/index')
require('./config/mongoose')

const PORT = process.env.PORT || 3000
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

app.use(routes)

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})