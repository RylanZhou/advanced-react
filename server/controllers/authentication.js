const User = require('../models/user')

exports.signup = (request, response, next) => {
  const { username, email, password } = request.body
  // See if a user with the given email exists
  User.findOne({ email }, (error, result) => {
    if (error) {
      return next(error)
    }
    // If a user with email exists, return error
    if (result) {
      return response.status(422).send({ error: 'Email is in use.' }) // 422: Un-processable entity
    }

    // If a user does not exists, create a new user and save it
    const user = new User({
      username,
      email,
      password
    })
    user.save((error) => {
      if (error) {
        return next(error)
      }

      // Respond indicating that the user has been created
      response.json({ success: true })
    })
  })
}
