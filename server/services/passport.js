const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')
const config = require('../config')
const User = require('../models/user')

// Set up options for local strategy
const localOptions = {
  // By default, LocalStrategy will look for username and password. If we want to use email instead, add the line below.
  usernameField: 'email'
}

// Create local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this username and password
  User.findOne({ email }, (error, user) => {
    if (error) {
      return done(error)
    }
    if (!user) {
      return done(null, false)
    }

    // Compare passwords
    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        return done(error)
      }
      if (!isMatch) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
  // If it is the correct username and password
  // Otherwise, call done with false
})

// Set up options for JWT strategy
const jwtOptions = {
  // Tell the strategy where to look for the JWT(header, url, body, etc)
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // What key to use to decode
  secretOrKey: config.secret
}

// Create JWT strategy
// payload is the decoded JWT data
const jwtSignUp = new JwtStrategy(jwtOptions, (payload, done) => {
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
passport.use(jwtSignUp)
passport.use(localLogin)
