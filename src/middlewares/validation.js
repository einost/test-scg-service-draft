const Joi = require('joi')

const adminLogin = {
  property: 'body',
  schema: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required()
  })
}

const getVendingMachineList = {
  property: 'query',
  schema: Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().max(100).required()
  })
}

const getStockList = {
  property: 'body',
  schema: Joi.object({
    vendingMachineId: Joi.string().required()
  })
}

const vendingMachinePayment = {
  property: 'body',
  schema: Joi.object({
    productId: Joi.string().required()
  })

}

module.exports = {
  adminLogin,
  getVendingMachineList,
  getStockList,
  vendingMachinePayment
}
