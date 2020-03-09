const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose

// Define the model
const userSchema = new Schema({
  username: { type: String, required: [true, 'Username cannot be empty.'] },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email cannot be empty.']
  },
  password: { type: String, required: [true, 'Password cannot be empty.'] }
})

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

// Create the model class and export it
module.exports = mongoose.model('user', userSchema)
