import { CareersModel } from '../database/mongo/models/careers'

class Careers {
  process (args) {
    const { type, data } = args
    let result
    switch (type) {
      case 'store':
        result = this.store(data)
        break
      case 'getOne':
        result = this.getOne(data)
        break
      case 'getAll':
        result = this.getAll()
    }

    return result
  }

  async store (args) {
    const { code, name } = args
    const career = new CareersModel({ code, name })

    try {
      const result = await career.save()

      return result
    } catch (err) {
      throw new Error(
        'There was a problem trying to store the career in the database'
      )
    }
  }

  async getOne (args) {
    const { code } = args

    try {
      const career = await CareersModel.findOne({ code: { $eq: code } })

      if(!career) throw new Error('The requested career doesn\'t exists.')

      return career
    } catch (err) {
      if(err.message) throw err

      throw new Error(
        'There was a problem trying to get the requested career'
      )
    }
  }

  async getAll () {
    try {
      const careers = await CareersModel.find({})

      return careers
    } catch (error) {
      throw new Error('There was an error trying to get all the careers')
    }
  }
}

export { Careers }
