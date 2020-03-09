### 4.3 Password Encrypt

If a password in the database is visible, it's a tremendous false. So we have to use `bcrypt-nodejs` to encrypt the password. In `/models/user.js`, we will wire up this library in the save hook. Add this block of code under `userSchema`:

```javascript
// On save hook, encrypt password
userSchema.pre('save', function(next) {
  // Get access to the user model
  const user = this
  try {
    const salt = bcrypt.genSaltSync(10)
    // Encrypt the password using the salt
    const hash = bcrypt.hashSync(user.password, salt, null)
    // Overwrite
    user.password = hash
    // Go ahead and save the model
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
})
```

### 4.4 JWT

For more information, check [here](https://jwt.io/introduction).

1. When a user successfully signed in or signed up, we have to give this user an authentication rather than a `success: true`.

2. To create a JWT, we are going to use a library: `jwt-simple`. Then create a method for generating. In this case, we will put this generator on top of `controllers/authentication.js`.

```javascript
const jwt = require('jwt-simple')
const config = require('../config')

// sub is a convention key, meaning "Who does this token belong to", the short for 'subject'.
// iat is another convention key, the short for 'issued at time`.
const tokenForUser = (user) => {
  const timestamp = +new Date()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}
```

3. Then instead of returning `success: true`, we will return the token.

```javascript
await user.save()
// Respond indicating that the user has been created
response.json({ token: tokenForUser(user) })
```

### 4.5 Decode

For authenticating whether a jwt is valid, we are going to build another controller. And we also have to use two libraries: `passport` and `passport-jwt`.

For every request that needs user's identification, firstly it will go through passport to verify then hand over to routes.

#### 4.5.1 Config Passport

`services/passport.js`

```javascript
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
```
