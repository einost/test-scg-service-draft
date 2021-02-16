const controller = require('../controllers')
const { verifyAuth } = require('../config')

module.exports = (app) => {
  app.post('/api/admin/login', async (req, res) => {
    return await controller.adminLogin(req, res)
  })
}
