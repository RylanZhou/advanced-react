const { Router } = require('express')
const Authentication = require('./controllers/authentication')

// eslint-disable-next-line no-unused-vars
const PassportService = require('./services/passport') // No where to use but necessary
const passport = require('passport')

// Use jwt strategy, and if a user is authenticated, don't create session, because by default, passport wants to make a cookie based session but we are using token so we don't need that.
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

const authRouter = Router()
authRouter.route('/signup').post(Authentication.signup)
authRouter.route('/signin').post(requireSignin, Authentication.signin)

module.exports = (app) => {
  // First send them through requireAuth. If succeeded, send Hello back.
  app.get('/', requireAuth, (request, response) => {
    response.send('Hello!')
  })
  app.use('/api/auth', authRouter)
}
