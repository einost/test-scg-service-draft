const JWT = require('jsonwebtoken')
const Joi = require('joi')
const Constants = require('../constants')

const auth = (req, res, next) => {
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

const validate = (schema, property) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[property])
      const valid = error == null
      if (valid) {
        next()
      } else {
        const { details } = error
        const message = details.map(i => i.message).join(',')
        console.log('Error', message)
        res.status(400).json({ error: message })
      }
    } catch (error) {
      console.log(error)
      res.boom.badImplementation(error)
    }
  }
}

module.exports = {
  Auth: auth,
  Validate: validate
}
