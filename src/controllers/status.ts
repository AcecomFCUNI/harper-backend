/* eslint-disable class-methods-use-this */
import { DtoStatus } from '../dto-interfaces/status.dto'
import { IStatus, StatusModel } from '../models/status'

class Status {
  private _args: DtoStatus

  constructor (args: DtoStatus) {
    this._args = args
  }

  async process (type: string): Promise<IStatus | IStatus[] | undefined> {
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

  private async _store (args: DtoStatus['data']): Promise<IStatus> {
    const { name } = args
    const status = new StatusModel({ name })

    try {
      const result = await status.save()

      return result
    } catch (error) {
      console.log('There was an error trying to store the new status')
      throw error
    }
  }

  private async _getAll (): Promise<IStatus[]> {
    try {
      const result = await StatusModel.find({}, '-__v -_id')

      return result
    } catch (error) {
      console.log('There was an error trying to get all the status')
      throw error
    }
  }

  private async _getOne (args: DtoStatus['data']): Promise<IStatus> {
    const { name } = args

    try {
      const result = await StatusModel.findOne(
        { name: { $eq: name } },
        '-__v -_id'
      )

      if (!result) {
        console.log('The requested status doesn\'t exist.')
        throw new Error('The requested status doesn\'t exist.')
      }

      return result
    } catch (error) {
      if (error.message) throw error

      console.log('There was an error trying to get the requested status')
      throw error
    }
  }
}

export { Status }
