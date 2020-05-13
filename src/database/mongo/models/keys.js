import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const Keys = new Schema(
  {
    createdAt: {
      default: Date.now,
      type   : Date,
      unique : true
    },
    key: {
      type  : String,
      unique: true
    }
  },
  { collection: 'keys' }
)

Keys.plugin(uniqueValidator)

const KeysModel = mongoose.model('Keys', Keys)

export { KeysModel }
