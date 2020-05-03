import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const DataArea = new Schema(
  {
    abstract: {
      required: true,
      type    : String
    },
    code: {
      default: 1,
      type   : Number
    },
    image: {
      default: '',
      type   : String
    },
    name: {
      required: true,
      type    : String,
      unique  : true
    }
  },
  { collection: 'dataArea' }
)

DataArea.plugin(uniqueValidator)

const DataAreaModel = mongoose.model('DataArea', DataArea)

export { DataAreaModel }
