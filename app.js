const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const app = express()

const bodyParser = require('body-parser')
const boom = require('express-boom-v2')
const cors = require('cors')
const uuid = require('uuid')
const Config = require('./src/config')
const Constants = require('./src/constants')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(
  logger(function (tokens, req, res) {
    if (tokens.method(req, res) === 'OPTIONS') {
      return ''
    }
    const id = uuid.v4()
    const newLine = '*\n*\n*'
    const startDate = new Date()
    startDate.setMilliseconds(startDate.getMilliseconds() - parseInt(tokens['response-time'](req, res)))
    const endDate = new Date()
    return [
      `========== [${startDate.toISOString()}] --> ${id} ==========`,
      newLine,
      `url: ${tokens.url(req, res)}`,
      `method: ${tokens.method(req, res)}`,
      `headers: ${JSON.stringify({
        authorization: req.headers.authorization || "none"
      }, null, 2)}`,
      `body: ${JSON.stringify({
        ...req.body,
        password: 'detected to remove'
      }, null, 2)}`,
      `status: ${tokens.status(req, res)}`,
      newLine,
      `========== [${endDate.toISOString()}] --> ${id} ==========`,
    ].join('\n')
  })
)
app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(boom())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

// routes
require('./src/routes')(app)

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
