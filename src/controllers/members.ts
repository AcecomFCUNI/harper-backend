/* eslint-disable class-methods-use-this */
import { DtoMembers } from '../dto-interfaces/members.dto'
import { ICareers, CareersModel } from '../models/careers'
import { IMembers, MembersModel } from '../models/members'
import { AreasModel, IAreas } from '../models/areas'
import { IStatus, StatusModel } from '../models/status'
import { nullPromise } from '../functions/utils/nullPromise'

class DataMembers {
  private _args: DtoMembers

  constructor (args: DtoMembers) {
    this._args = args
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async process (type: string) {
    const { data } = this._args
    let result

    switch (type) {
      case 'store':
        result = await this._store(data)
        break
      case 'getAll':
        result = await this._getAll()
        break
      case 'getMembersPerArea':
        result = await this._getMembersPerArea(data)
        break
      case 'getOne':
        result = await this._getOne(data)
        break
      case 'update':
        result = await this._update(data)
        break
    }

    return result
  }

  private async _store (args: DtoMembers['data']): Promise<IMembers> {
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

    if (
      !area ||
      !birthday ||
      !career ||
      !code ||
      !email ||
      !lastName ||
      !name ||
      !status
    )
      throw new Error(
        'The are, birthday, career, code, email, lastName, name, or status is missing!'
      )

    try {
      const data = await Promise.all([
        CareersModel.findOne({ code: career as string }, '_id'),
        AreasModel.findOne({ name: area as string }, '_id'),
        StatusModel.findOne({ name: status as string }, '_id')
      ])

      const careerId = data[0] as ICareers['_id']
      const areaId = data[1] as IAreas['_id']
      const statusId = data[2] as IStatus['_id']

      const member = new MembersModel({
        area    : areaId,
        birthday: new Date(birthday as string),
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
    } catch (error) {
      console.log('There was an error trying to save a new member')
      throw error
    }
  }

  private async _getAll (): Promise<DtoMembers['data'][]> {
    try {
      const members = await MembersModel.find({})
        .populate({ path: 'area', select: 'name -_id' })
        .populate({ path: 'career', select: 'code name -_id' })
        .populate({ path: 'status', select: 'name -_id' })
        .exec()

      // TODO: Implement a function to clean the data
      const result = members.map(member => {
        return {
          area    : member.area.name,
          birthday: member.birthday.toJSON().slice(0, 10),
          career  : member.career,
          code    : member.code,
          email   : member.email,
          git     : member.git,
          key     : member.key,
          lastName: member.lastName,
          name    : member.name,
          phone   : member.phone,
          photo   : member.photo,
          status  : member.status.name
        }
      })

      return result
    } catch (error) {
      console.log('There was a problem trying to get all the members')
      throw error
    }
  }

  private async _getMembersPerArea (args: DtoMembers['data']): Promise<DtoMembers['data'][]> {
    const { area } = args

    try {
      const areaId = await AreasModel.findOne({ name: area }, '_id')

      const members = await MembersModel.find({ area: areaId as IAreas['_id'] })
        .populate({ path: 'area', select: 'name -_id' })
        .populate({ path: 'career', select: 'code name -_id' })
        .populate({ path: 'status', select: 'name -_id' })
        .exec()

      const result = members.map(member => {
        return {
          area    : member.area.name,
          birthday: member.birthday.toJSON().slice(0, 10),
          career  : member.career,
          code    : member.code,
          email   : member.email,
          git     : member.git,
          key     : member.key,
          lastName: member.lastName,
          name    : member.name,
          phone   : member.phone,
          photo   : member.photo,
          status  : member.status.name
        }
      })

      return result
    } catch (error) {
      console.log('There was a problem while trying to get the data')
      throw error
    }
  }

  private async _getOne (args: DtoMembers['data']): Promise<DtoMembers['data']> {
    const { code } = args

    try {
      const member = await MembersModel.findOne({ code: { $eq: code } }, '-__v')
        .populate({ path: 'area', select: 'name -_id' })
        .populate({ path: 'career', select: 'code name -_id' })
        .populate({ path: 'status', select: 'name -_id' })

      if (!member) throw new Error("The requested user doesn't exist.")

      return {
        area    : member.area.name,
        birthday: member.birthday.toJSON().slice(0, 10),
        career  : member.career,
        code    : member.code,
        email   : member.email,
        git     : member.git,
        key     : member.key,
        lastName: member.lastName,
        name    : member.name,
        phone   : member.phone,
        photo   : member.photo,
        status  : member.status.name
      }
    } catch (error) {
      if (error.message) {
        console.log(error)
        throw error
      }
      console.log('The was a problem trying to get the requested student.')
      throw error
    }
  }

  private async _update (args: DtoMembers['data']): Promise<IMembers | null> {
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

    try {
      if (!code) throw new Error('The code is mandatory!')

      const currentMember = await MembersModel.findOne({ code })
      if (!currentMember) throw new Error('The code is incorrect!')

      let eData: [IAreas | null, ICareers | null, IStatus | null]
      // eData:= extra data:
      //   - eData[0]: new area
      //   - eData[1]: new career
      //   - eData[2]: new status

      if (area && career && status)
        eData = await Promise.all([
          AreasModel.findOne({ name: area }, '_id'),
          CareersModel.findOne({ name: career }, '_id'),
          StatusModel.findOne({ name: status }, '_id')
        ])
      else if (!area && career && status)
        eData = await Promise.all([
          nullPromise(),
          CareersModel.findOne({ name: career }, '_id'),
          StatusModel.findOne({ name: status }, '_id')
        ])
      else if (area && !career && status)
        eData = await Promise.all([
          AreasModel.findOne({ name: area }, '_id'),
          nullPromise(),
          StatusModel.findOne({ name: status }, '_id')
        ])
      else if (area && career && !status)
        eData = await Promise.all([
          AreasModel.findOne({ name: area }, '_id'),
          CareersModel.findOne({ name: career }, '_id'),
          nullPromise()
        ])
      else if (!area && !career && status)
        eData = await Promise.all([
          nullPromise(),
          nullPromise(),
          StatusModel.findOne({ name: status }, '_id')
        ])
      else if (!area && career && !status)
        eData = await Promise.all([
          nullPromise(),
          CareersModel.findOne({ name: career }, '_id'),
          nullPromise()
        ])
      else if (area && !career && !status)
        eData = await Promise.all([
          AreasModel.findOne({ name: area }, '_id'),
          nullPromise(),
          nullPromise()
        ])
      else throw new Error('Area, career or status are missing!')

      // Update
      const newMember = {
        area    : area ? eData[0] as IAreas['_id'] : currentMember.area,
        birthday: birthday ? new Date(birthday) : currentMember.birthday,
        career  : career ? eData[1] as ICareers['_id'] : currentMember.career,
        code    : newCode || code,
        email   : email as string[] || currentMember.email,
        git     : git as string || currentMember.git,
        key     : key as boolean || currentMember.key,
        lastName: lastName as string || currentMember.lastName,
        name    : name as string || currentMember.name,
        phone   : phone as string[] || currentMember.phone,
        photo   : photo as string || currentMember.photo,
        status  : status ? eData[2] as IStatus['_id'] : currentMember.status
      }

      const updatedMember = await MembersModel.findOneAndUpdate(
        { code: code as string },
        newMember,
        { new: true }
      )

      return updatedMember
    } catch (error) {
      if (error.message) {
        console.log(error.message)
        throw error
      }
      console.log('There was an error trying to update the requested member')
      throw error
    }
  }
}

export { DataMembers }
