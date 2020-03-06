const mongoose = require('mongoose')
const { Schema } = mongoose

// Define the model
const userSchema = new Schema({
  username: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String }
})

// Create the model class and export it
module.exports = mongoose.model('user', userSchema)
