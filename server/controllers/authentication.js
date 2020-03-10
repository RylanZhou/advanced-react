const jwt = require('jwt-simple')
const config = require('../config')
const User = require('../models/user')

// sub is a convention key, meaning "Who does this token belong to", the short for 'subject'.
// iat is another convention key, the short for 'issued at time`.
const tokenForUser = (user) => {
  const timestamp = +new Date()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

/**
 * @description Sign up a new user
 * @route       POST /api/auth/signup
 * @access      Public
 */
exports.signup = async (request, response, next) => {
  try {
    const { username, email, password } = request.body
    // See if a user with the given email exists
    const result = await User.findOne({ email })
    if (result) {
      return response.status(422).json({
        // 422: Un-accessible request
        success: false,
        error: 'Duplicated email.'
      })
    }
    // If a user does not exists, create a new user and save it
    const user = new User({
      username,
      email,
      password
    })
    await user.save()
    // Respond indicating that the user has been created
    response.json({ token: tokenForUser(user) })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((error) => error.message)
      return response.status(400).json({
        success: false,
        error: messages
      })
    }
    return response.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}

/**
 * @description User Sign In
 * @route       POST /api/auth/signin
 * @access      Public
 */
exports.signin = async (request, response, next) => {
  // User has already had their email and password authed.
  // So we just need to give back the token
  // user instance has been put into request by passport
  response.send({ token: tokenForUser(request.user) })
}
