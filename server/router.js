const { Router } = require('express')
const Authentication = require('./controllers/authentication')

const authRouter = Router()
authRouter.route('/signup').post(Authentication.signup)

module.exports = (app) => {
  app.use('/api/auth', authRouter)
}
