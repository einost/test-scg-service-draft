const _ = require('underscore')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const {
  Constants: { AdminRole, VendingMachineStatus },
  DB: { Admin, VendingMachine, Product, Stock },
  Utils: { Email }
} = require('test-scg-sdk')
const Constants = require('../constants')

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.boom.badRequest('user not exists')
    }
    const isMatch = bcrypt.compareSync(password, admin.password)
    if (!isMatch) {
      return res.boom.badRequest('invalid password')
    }
    const testScgToken = JWT.sign({ email }, Constants.SECRET_KEY, {
      expiresIn: Constants.TOKEN_EXPIRE
    })
    const testScgRefreshToken = JWT.sign({ email }, Constants.SECRET_KEY, {
      expiresIn: Constants.REFRESH_TOKEN_EXPIRE
    })
    return res.json({
      statusCode: 200,
      data: {
        testScgToken,
        testScgRefreshToken
      }
    })
  } catch (error) {
    console.log(error)
    return res.boom.badImplementation()
  }
}

module.exports = {
  adminLogin
}
