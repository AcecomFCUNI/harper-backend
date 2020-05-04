import { MemberStatusModel } from '../database/mongo/models/memberStatus.js'

class MemberStatus {
  process (args) {
    const { type, data } = args
    let result
    switch (type) {
      case 'store':
        result = this.store(data)
        break
      case 'getAll':
        result = this.getAll()
        break
      case 'getOne':
        result = this.getOne(data)
    }

    return result
  }

  async store (args) {
    const { name } = args
    const memberStatus = new MemberStatusModel({ name })

    try {
      const result = await memberStatus.save()

      return result
    } catch (err) {
      throw new Error(
        'There was an error trying to store the requested member status'
      )
    }
  }

  async getAll () {
    try {
      const result = await MemberStatusModel.find({})

      return result
    } catch (err) {
      throw new Error('There was an error trying to get all the member status')
    }
  }

  async getOne (args) {
    const { name } = args

    try {
      const result = await MemberStatusModel.find(
        { name: { $eq: name } },
        { __v: false }
      )

      if(!result)
        throw new Error("The requested member status doesn't exist.")

      return result[0]
    } catch (err) {
      if(err.message) throw err

      throw new Error(
        'There was an error trying to get the requested member status'
      )
    }
  }
}

export { MemberStatus }
