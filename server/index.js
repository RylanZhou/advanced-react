// Main starting point of the server
const express = require('express')
const morgan = require('morgan')
const app = express()

const router = require('./router')
const connectDB = require('./db')

// DB Setup
connectDB()

// App Setup
app.use(morgan('combined')) // Logging framework
app.use(express.json({ type: '*/*' })) // Parse incoming requests into JSON, no matter what the type is.
router(app)

// Server Setup
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
