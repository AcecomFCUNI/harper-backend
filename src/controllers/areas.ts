/* eslint-disable class-methods-use-this */
import { DtoAreas } from '../dto-interfaces/areas.dto'
import { AreasModel, IAreas } from '../models/areas'

class Areas {
  private _args: DtoAreas

  constructor (args: DtoAreas) {
    this._args = args
  }

  public async process (type: string): Promise<IAreas | IAreas[] | undefined> {
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
        break
      case 'update':
        result = await this._update(data)
    }

    return result
  }

  private async _store (args: DtoAreas['data']): Promise<IAreas> {
    const { abstract, image, name } = args

    try {
      const areaStored = await AreasModel.findOne({}).sort({ code: -1 })
      let dataArea

      if (areaStored) {
        const code = areaStored.code + 1
        dataArea = new AreasModel({ abstract, code, image, name })
      } else dataArea = new AreasModel({ abstract, image, name })

      const result = await dataArea.save()

      return result
    } catch (error) {
      console.log('There was a problem trying to store the area.')
      throw error
    }
  }

  private async _getAll (): Promise<IAreas[]> {
    try {
      const result = await AreasModel.find({}, '-__v')

      return result
    } catch (error) {
      console.log('There was a problem trying to get all the areas.')
      throw error
    }
  }

  private async _getOne (args: DtoAreas['data']): Promise<IAreas> {
    const { name } = args

    try {
      const result = await AreasModel
        .findOne({ name: { $eq: name } }, '-__v')

      if (!result) throw new Error('The requested area doesn\'t exist.')

      return result
    } catch (error) {
      if (error.message) {
        console.log(error)
        throw error
      }
      console.log('There was a problem trying to get the requested areas.')
      throw error
    }
  }

  private async _update (args: DtoAreas['data']): Promise<IAreas> {
    const { abstract, image, name, newName } = args

    const currentArea = await AreasModel.findOne({ name: name as string })

    if (!currentArea) throw new Error('The requested area doesn\'t exists!')

    let result: IAreas | null

    if (abstract && image && newName)
      try {
        result = await AreasModel.findOneAndUpdate(
          {
            name: { $eq: name }
          },
          {
            abstract,
            image,
            name: newName as string
          },
          { new: true }
        )
      } catch (error) {
        console.error('There was a problem trying to update the abstract, image or name')
        throw error
      }
    else if (!abstract && image && newName)
      try {
        result = await AreasModel.findOneAndUpdate(
          {
            name: { $eq: name }
          },
          {
            image,
            name: newName as string
          },
          { new: true }
        )
      } catch (error) {
        console.error('There was a problem trying to update the image or name')
        throw error
      }
    else if (abstract && !image && newName)
      try {
        result = await AreasModel.findOneAndUpdate(
          {
            name: { $eq: name }
          },
          {
            abstract,
            name: newName as string
          },
          { new: true }
        )
      } catch (error) {
        console.error('There was a problem trying to update the abstract or name')
        throw error
      }
    else if (abstract && image && !newName)
      try {
        result = await AreasModel.findOneAndUpdate(
          {
            name: { $eq: name }
          },
          {
            abstract,
            image
          },
          { new: true }
        )
      } catch (error) {
        console.error('There was a problem trying to update the abstract or image')
        throw error
      }
    else if (!abstract && !image && newName)
      try {
        result = await AreasModel.findOneAndUpdate(
          {
            name: { $eq: name }
          },
          {
            name: newName as string
          },
          { new: true }
        )
      } catch (error) {
        console.error('There was a problem trying to update the name')
        throw error
      }
    else if (!abstract && image && !newName)
      try {
        result = await AreasModel.findOneAndUpdate(
          {
            name: { $eq: name }
          },
          {
            image
          },
          { new: true }
        )
      } catch (error) {
        console.error('There was a problem trying to update the image')
        throw error
      }
    else if (abstract && !image && !newName)
      try {
        result = await AreasModel.findOneAndUpdate(
          {
            name: { $eq: name }
          },
          {
            abstract
          },
          { new: true }
        )
      } catch (error) {
        console.error('There was a problem trying to update the image')
        throw error
      }
    else throw new Error('There\'s nothing to update!')

    return result as IAreas
  }
}

export { Areas }
