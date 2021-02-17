const controller = require('../controllers')
const { Auth, Validate } = require('../middlewares')
const {
  adminLogin,
  getVendingMachineList,
  getStockList,
  vendingMachinePayment
} = require('../middlewares/validation')

module.exports = (app) => {
  app.post(
    '/api/admin/login',
    // Validate(adminLogin.schema, adminLogin.property),
    controller.adminLogin
  )
  app.post(
    '/api/auth/refresh-token',
    controller.refreshToken
  )
  app.get(
    '/api/vending-machine/get-list',
    Auth,
    Validate(getVendingMachineList.schema, getVendingMachineList.property),
    controller.getVendingMachineList
  )
  app.post(
    '/api/vending-machine/get-stock-list',
    Auth,
    Validate(getStockList.schema, getStockList.property),
    controller.getStockList
  )
  app.post(
    '/api/vending-machine/payment',
    Auth,
    Validate(vendingMachinePayment.schema, vendingMachinePayment.property),
    controller.vendingMachinePayment
  )
  app.get(
    '/api/vending-machine/auto-create',
    controller.autoCreateVendingMachine
  )
  app.get(
    '/api/product/auto-create',
    controller.autoCreateProduct
  )
  app.get(
    '/api/admin/create',
    controller.createAdmin
  )
}
