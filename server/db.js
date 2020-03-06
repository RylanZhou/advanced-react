const mongoose = require('mongoose')

module.exports = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb://root:mongo123@127.0.0.1:27017/advanced_react',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('Error', error)
    process.exit(1)
  }
}
