import { CareersModel } from '../database/mongo/models/careers'
import { DataMembersModel } from '../database/mongo/models/dataMembers'
import { DataAreaModel } from '../database/mongo/models/dataArea'
import { MemberStatusModel } from '../database/mongo/models/memberStatus'

import { DataArea } from './dataArea'
import { MemberStatus } from './memberStatus'

class DataMembers {
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
      case 'getMembersPerArea':
        result = this.getMembersPerArea(data)
        break
      case 'getOne':
        result = this.getOne(data)
        break
      case 'update':
        result = this.update(data)
        break
    }

    return result
  }

  async store (args) {
    const {
      area,
      birthday,
      career,
      code,
      email,
      git,
      key,
      lastName,
      name,
      phone,
      photo,
      status
    } = args

    try {
      const data = await Promise.all([
        CareersModel.findOne({ code: { $eq: career } }),
        DataAreaModel.findOne({ name: { $eq: area } }),
        MemberStatusModel.findOne({ name: { $eq: status } })
      ])

      const careerId = data[0]._id
      const areaId = data[1]._id
      const statusId = data[2]._id

      const member = new DataMembersModel({
        area    : areaId,
        birthday: new Date(birthday),
        career  : careerId,
        code,
        email,
        git,
        key,
        lastName,
        name,
        phone,
        photo,
        status  : statusId
      })
      const result = await member.save()

      return result
    } catch (err) {
      console.log(err)
      throw new Error('There was an error trying to save a new member')
    }
  }

  async getAll () {
    try {
      const members = await DataMembersModel.find({})
        .populate({ path: 'area', select: 'name -_id' })
        .populate({ path: 'career', select: 'code name -_id' })
        .populate({ path: 'status', select: 'name -_id' })
        .exec()

      const result = members.map(member => {
        return {
          area    : member.area.name,
          birthday: member.birthday,
          career  : member.career,
          code    : member.code,
          email   : member.email[0],
          git     : member.git,
          key     : member.key,
          lastName: member.lastName,
          name    : member.name,
          phone   : member.phone[0],
          photo   : member.photo,
          status  : member.status.name
        }
      })

      return result
    } catch (err) {
      throw new Error('There was a problem trying to get all the members')
    }
  }

  async getMembersPerArea (args) {
    const { area } = args

    try {
      const areaId = await DataAreaModel.findOne({ name: area }, { _id: true })

      const members = await DataMembersModel.find({ area: areaId._id })
        .populate({ path: 'area', select: 'name -_id' })
        .populate({ path: 'career', select: 'code name -_id' })
        .populate({ path: 'status', select: 'name -_id' })
        .exec()

      const result = members.map(member => {
        return {
          area    : member.area.name,
          birthday: member.birthday,
          career  : member.career,
          code    : member.code,
          email   : member.email[0],
          git     : member.git,
          key     : member.key,
          lastName: member.lastName,
          name    : member.name,
          phone   : member.phone[0],
          photo   : member.photo,
          status  : member.status.name
        }
      })

      return result
    } catch (err) {
      console.log(err)
      throw new Error('There was a problem while trying to get the data')
    }
  }

  async getOne (args) {
    const { code } = args

    try {
      const member = await DataMembersModel.findOne(
        { code: { $eq: code } },
        { __v: false }
      )
        .populate({ path: 'area', select: 'name -_id' })
        .populate({ path: 'career', select: 'code name -_id' })
        .populate({ path: 'status', select: 'name -_id' })

      if(!member) throw new Error('The requested user doesn\'t exist.')

      return {
        area    : member.area.name,
        birthday: member.birthday,
        career  : member.career,
        code    : member.code,
        email   : member.email[0],
        git     : member.git,
        key     : member.key,
        lastName: member.lastName,
        name    : member.name,
        phone   : member.phone[0],
        photo   : member.photo,
        status  : member.status.name
      }
    } catch (err) {
      if(err.message) throw err

      throw new Error('The was a problem trying to get the requested student.')
    }
  }

  async update (args) {
    const {
      area,
      birthday,
      career,
      code,
      email,
      git,
      key,
      lastName,
      name,
      newCode,
      phone,
      photo,
      status
    } = args

    const da = new DataArea()
    const ms = new MemberStatus()

    try {
      if(!code) throw new Error('The code is mandatory!')

      let data

      // data:
      //   - data[0]: current member
      //   - data[1]: new area
      //   - data[2]: new status

      if(area && status)
        data = await Promise.all([
          this.getOne({ code }),
          da.getOne({ name: area }),
          ms.getOne({ name: status })
        ])
      else if(!area && status) {
        data = await Promise.all([
          this.getOne({ code }),
          ms.getOne({ name: status })
        ])
        data.push(null)
        const aux = data[1]
        data[1] = data[2]
        data[2] = aux
      } else if(area && !status) {
        data = await Promise.all([
          this.getOne({ code }),
          da.getOne({ name: area })
        ])
        data.push(null)
      }

      // Update
      const newMember = {
        area    : data[1] ? data[1]._id : data[0].area,
        birthday: birthday ? new Date(birthday) : data[0].birthday,
        career  : career || data[0].career,
        code    : newCode || data[0].code,
        // TODO: split the sended emails into an array, this is assuming there was just one email
        email   : [email] || data[0].email,
        git     : git || data[0].git,
        key     : key || data[0].key,
        lastName: lastName || data[0].lastName,
        name    : name || data[0].name,
        // TODO: split the sended phones into an array, this is assuming there was just one phone
        phone   : [phone] || data[0].phone,
        photo   : photo || data[0].photo,
        status  : data[2] ? data[2]._id : data[0].status
      }
      await DataMembersModel.findOneAndUpdate({ code }, newMember)

      return this.getOne({ code: newCode || code })
    } catch (err) {
      if(err.message) throw err

      throw new Error(
        'There was an error trying to update the requested member'
      )
    }
  }
}

export { DataMembers }
