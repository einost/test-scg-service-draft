const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const boom = require('express-boom-v2')
const app = express()
const Config = require('./src/config')
const Constants = require('./src/constants')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(boom())
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

// routes
require('./src/routes/index')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// server start
const port = Constants.PORT || 8001
app.listen(port)
console.log(`Server listening on ${port}`)

// connect db
Config.database.connect(Constants.DB_URL)
