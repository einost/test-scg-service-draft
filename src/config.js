const mongoose = require('mongoose')

const database = {
  connect: async (dbAddress) => {
    try {
      await mongoose.connect(dbAddress, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      console.log(`DB connected on ${dbAddress}`)
    } catch (error) {
      console.log(error)
    }
  },
  close: async () => {
    try {
      await mongoose.connection.close()
      console.log(`DB disconnected`)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = {
  database
}
