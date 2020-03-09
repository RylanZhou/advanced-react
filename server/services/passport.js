const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const config = require('../config')
const User = require('../models/user')

// Set up options for JWT strategy
const jwtOptions = {
  // Tell the strategy where to look for the JWT(header, url, body, etc)
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // What key to use to decode
  secretOrKey: config.secret
}

// Create JWT strategy
// payload is the decoded JWT data
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // The structure of payload is pretty much the same as in the tokenForUser() in authentication.js
  User.findById(payload.sub, (error, user) => {
    if (error) {
      return done(error, false)
    }
    if (user) {
      // If user ID in the payload exists in the db, call done() with the user object
      done(null, user)
    } else {
      // Otherwise, call done() without a user object
      done(null, false)
    }
  })
})

// Tell passport to use this strategy
passport.use(jwtLogin)
