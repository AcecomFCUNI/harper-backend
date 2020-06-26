/* eslint-disable class-methods-use-this */
import { DtoProjects } from '../dto-interfaces/projects.dto'
import { IProjects, ProjectsModel } from '../models/projects'
import { AreasModel, IAreas } from '../models/areas'
import { IMembers, MembersModel } from '../models/members'
import { nullPromise } from '../functions/utils/nullPromise'

class Projects {
  private _args: DtoProjects

  constructor (args: DtoProjects) {
    this._args = args
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async process (type: string) {
    const { data } = this._args
    let result
    switch (type) {
      case 'store':
        result = await this._store(data)
        break
      case 'getAll':
        result = await this.getAll()
        break
      case 'getOne':
        result = await this.getOne(data)
        break
      case 'getProjectsPerArea':
        result = await this.getProjectsPerArea(data)
        break
      case 'update':
        result = await this.update(data)
    }

    return result
  }

  private async _store (args: DtoProjects['data']): Promise<IProjects> {
    const { area, description, name, participants, repo, topic } = args

    if (!area) throw new Error('The area is mandatory!')
    if (!description) throw new Error('The description is mandatory!')
    if (!name) throw new Error('The name is mandatory!')
    if (!participants) throw new Error('The participants are mandatory!')
    if (!topic) throw new Error('The topic is mandatory!')


    try {
      // data:
      //  - data[0]: areaId
      //  - data[1]: participantIds
      const data = await Promise.all([
        AreasModel.findOne({ name: area }, '_id'),
        MembersModel.find({ code: { $in: participants } }, '_id')
      ])

      let projects
      if (repo)
        projects = new ProjectsModel({
          area        : data[0] as IAreas,
          description,
          name,
          participants: data[1] as IMembers[],
          repo,
          topic
        })
      else
        projects = new ProjectsModel({
          area        : data[0] as IAreas,
          description,
          name,
          participants: data[1] as IMembers[],
          topic
        })

      const result = await projects.save()

      return result
    } catch (error) {
      if (error.message) {
        console.log(error.message)
        throw error
      }

      console.log('There was an error while trying to store the project')
      throw error
    }
  }

  async getAll (): Promise<IProjects[]> {
    try {
      const projects = await ProjectsModel.find({}, '-__v')

      return projects
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  async getOne (args: DtoProjects['data']): Promise<IProjects> {
    const { name } = args

    try {
      const project = await ProjectsModel.findOne(
        { name: { $eq: name } },
        '-__v'
      )

      if (!project) throw new Error('The requested project doesn\'t exists.')

      return project
    } catch (error) {
      if (error.message) {
        console.log(error.message)
        throw error
      }
      console.log('There was a problem getting the requested project')
      throw error
    }
  }

  async getProjectsPerArea (args: DtoProjects['data']) {
    const { area } = args

    try {
      const areaId = await AreasModel.findOne(
        { name: { $eq: area } },
        '_id'
      )

      const populatedProjects = await ProjectsModel.find(
        { area: { $eq: areaId as IAreas } },
        '-__v'
      )
        .populate({
          path  : 'participants',
          select: 'name lastName code git -_id'
        })
        .populate({ path: 'area', select: 'name -_id' })
        .exec()

      const projects = populatedProjects.map(project => {
        const participants = project.participants.map(participant => {
          return {
            code    : participant.code,
            fullName: `${participant.name} ${participant.lastName}`,
            git     : participant.git || ''
          }
        })

        return {
          area       : project.area.name,
          description: project.description,
          name       : project.name,
          participants,
          repo       : project.repo,
          topic      : project.topic
        }
      })

      return projects
    } catch (error) {
      if (error.message) {
        console.log(error)
        throw error
      }
      console.log('There was a problem while trying to get all the requested projects.')
      throw error
    }
  }

  async update (args: DtoProjects['data']) {
    const {
      area,
      description,
      name,
      newName,
      participants,
      repo,
      topic
    } = args

    if (!name) throw new Error('The name is mandatory!')

    const currentProject = await ProjectsModel.findOne({
      name: { $eq: name }
    })

    if (!currentProject) throw new Error('The project name is incorrect')

    // data:
    //   - data[0]: areaId
    //   - data[1]: participantIds
    let data: [IAreas | null, IMembers[] | null]
    try {
      if (area && participants)
        data = await Promise.all([
          AreasModel.findOne({ name: { $eq: area as string } }, '_id'),
          MembersModel.find({ code: { $in: participants as string[] } }, '_id')
        ])
      else if (area && !participants)
        data = await Promise.all([
          await AreasModel.findOne({ name: { $eq: area } }, '_id'),
          nullPromise()
        ])
      else if (!area && participants)
        data = await Promise.all([
          nullPromise(),
          await MembersModel.find({ code: { $in: participants } }, '_id')
        ])
      else
        data = await Promise.all([
          nullPromise(),
          nullPromise()
        ])

      const newProject = await ProjectsModel.findOneAndUpdate(
        { name: { $eq: name } },
        {
          area        : data[0] || currentProject.area,
          description : description || currentProject.description,
          name        : newName || name,
          participants: data[1] || currentProject.participants,
          repo        : repo || currentProject.repo,
          topic       : topic || currentProject.topic
        },
        { new: true }
      )

      return newProject
    } catch (error) {
      if (error.message) {
        console.log(error.message)
        throw error
      }
      console.log('There was a problem while updating the requested project')
      throw error
    }
  }
}

export { Projects }
