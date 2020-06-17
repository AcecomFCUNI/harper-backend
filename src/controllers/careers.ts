/* eslint-disable class-methods-use-this */
import { DtoCareers } from '../dto-interfaces/careers.dto'
import { CareersModel, ICareers } from '../models/careers'

class Careers {
  private _args: DtoCareers

  constructor (args: DtoCareers) {
    this._args = args
  }

  // eslint-disable-next-line max-len
  public async process (type: string): Promise<ICareers | ICareers[] | undefined> {
    const { data } = this._args
    let result
    switch (type) {
      case 'store':
        result = await this._store(data)
        break
      case 'getAll':
        result = await this._getAll()
        break
      case 'getOne':
        result = await this._getOne(data)
    }

    return result
  }

  private async _store (args: DtoCareers['data']): Promise<ICareers> {
    const { code, name } = args
    const career = new CareersModel({ code, name })

    try {
      const result = await career.save()

      return result
    } catch (error) {
      console.log('There was a problem trying to store the career in the database')
      throw error
    }
  }

  private async _getAll (): Promise<ICareers[]> {
    try {
      const careers = await CareersModel.find({}, 'code name')

      return careers
    } catch (error) {
      console.log('There was an error trying to get all the careers')
      throw error
    }
  }

  private async _getOne (args: DtoCareers['data']): Promise<ICareers> {
    const { code } = args

    try {
      const career = await CareersModel.findOne(
        { code: { $eq: code as string } },
        'code name'
      )

      if (!career) throw new Error("The requested career doesn't exists.")

      return career
    } catch (err) {
      if (err.message) throw err

      throw new Error('There was a problem trying to get the requested career')
    }
  }
}

export { Careers }
