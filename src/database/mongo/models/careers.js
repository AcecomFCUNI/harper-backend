import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const Careers = new Schema(
  {
    code: {
      maxlength: 2,
      minlength: 2,
      type     : String,
      unique   : true
    },
    name: {
      type  : String,
      unique: true
    }
  },
  { collection: 'careers' }
)

Careers.plugin(uniqueValidator)

const CareersModel = mongoose.model('Careers', Careers)

export { CareersModel }
