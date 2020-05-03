import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO

mongoose.connect(MONGO_URI, {
  useFindAndModify  : false,
  useNewUrlParser   : true,
  useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true)

const db = mongoose.connection

export { db }
