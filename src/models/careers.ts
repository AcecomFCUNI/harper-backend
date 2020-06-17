import { Document, model, Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

interface ICareers extends Document {
  code: string,
  name: string
}

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
  }
)

Careers.plugin(uniqueValidator)

const CareersModel = model<ICareers>('careers', Careers)

export { ICareers, CareersModel }
