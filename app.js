const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const routes = require('./routes/index')
const usePassport = require('./config/passport')
require('./config/mongoose')

const PORT = process.env.PORT || 3000
const app = express()

app.engine('hbs', exphbs({
  defaultLayput: 'main',
  extname: '.hbs',
  helpers: require('./utils/handlebarsHelpers')
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false, // if true，每次與使用者互動後，強制把 session 更新到 session store 裡。
  saveUninitialized: true // 強制將未初始化的 session 存回 session store。
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})