const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const Constants = require('./constants')

const database = {
  connect: async (dbAddress) => {
    try {
      await mongoose.connect(dbAddress, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      console.log(`DB connected on ${dbAddress}`)
    } catch (error) {
      console.log(error)
    }
  },
  close: async () => {
    try {
      await mongoose.connection.close()
      console.log(`DB disconnected`)
    } catch (error) {
      console.log(error)
    }
  }
}

const verifyAuth = (req, res, next) => {
  try {
    const decoded = JWT.verify(req.headers.authorization, Constants.SECRET_KEY)
    const { vendingMachineId, email } = decoded
    if (!vendingMachineId && !email) {
      res.boom.unauthorized()
    }
    req.credentials = decoded
    next()
  } catch (error) {
    console.log(error)
    res.boom.unauthorized()
  }
}

module.exports = {
  database,
  verifyAuth
}
