import { ProjectsModel } from '../database/mongo/models/projects'
import { DataAreaModel } from '../database/mongo/models/dataArea'
import { DataMembersModel } from '../database/mongo/models/dataMembers'

class Projects {
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
        break
      case 'getProjectsPerArea':
        result = this.getProjectPerArea(data)
        break
      case 'update':
        result = this.update(data)
    }

    return result
  }

  async store (args) {
    const { area, description, name, participants, repo, topic } = args

    if(!area) throw new Error('The area is mandatory!')
    if(!description) throw new Error('The description is mandatory!')
    if(!name) throw new Error('The name is mandatory!')
    if(!participants) throw new Error('The participants are mandatory!')
    if(!topic) throw new Error('The topic is mandatory!')

    const studentCodes = participants.split(/[ ,]+/)

    let repoUrls = null
    if(repo) repoUrls = repo.split(/[ ,]+/)

    try {
      // data:
      //  - data[0]: areaId
      //  - data[1]: participantIds
      const data = await Promise.all([
        DataAreaModel.findOne({ name: area }, { _id: true }),
        DataMembersModel.find({ code: { $in: studentCodes } }, { _id: true })
      ])

      let projects
      if(repoUrls)
        projects = new ProjectsModel({
          area        : data[0],
          description,
          name,
          participants: data[1],
          repo        : repoUrls,
          topic
        })
      else
        projects = new ProjectsModel({
          area        : data[0],
          description,
          name,
          participants: data[1],
          topic
        })

      const result = await projects.save()

      return result
    } catch (err) {
      if(err.message) throw err

      throw new Error('There was an error while trying to store the project')
    }
  }

  async getAll () {
    try {
      const projects = await ProjectsModel.find({}, { __v: false })

      return projects
    } catch (err) {
      throw new Error(
        'There was an error while trying to get all the projects'
      )
    }
  }

  async getOne (args) {
    const { name } = args

    try {
      const project = await ProjectsModel.findOne(
        { name: { $eq: name } },
        { __v: false }
      )

      return project
    } catch (err) {
      throw new Error(
        'There was a problem while trying to get the requested project'
      )
    }
  }

  async getProjectsPerArea (args) {
    const { area } = args

    try {
      const result = await ProjectsModel.find(
        { area: { $eq: area } },
        { __v: false }
      )

      return result
    } catch (err) {
      throw new Error(
        'There was a problem while trying to get all the requested projects.'
      )
    }
  }

  async update (args) {
    const {
      area,
      description,
      name,
      newName,
      participants,
      repo,
      topic
    } = args

    if(!name) throw new Error('The name is mandatory!')

    // data:
    //   - data[0]: areaId
    //   - data[1]: participantIds
    let data = []
    try {
      if(area && participants)
        data = await Promise.all([
          DataAreaModel.findOne({ name: { $eq: area } }, { _id: true }),
          DataMembersModel.find({ code: { $in: participants } }, { _id: true })
        ])
      else if(area && !participants) {
        data.push(
          await DataAreaModel.findOne({ name: { $eq: area } }, { _id: true })
        )
        data.push(null)
      } else if(!area && participants) {
        data.push(null)
        data.push(
          await DataMembersModel.find(
            { code: { $in: participants } },
            { _id: true }
          )
        )
      } else {
        data.push(null)
        data.push(null)
      }

      const currentProject = await ProjectsModel.findOne({
        name: { $eq: name }
      })

      await ProjectsModel.findOneAndUpdate(
        { name: { $eq: name } },
        {
          area        : data[0] || currentProject.area,
          description : description || currentProject.description,
          name        : newName || name,
          participants: data[1] || currentProject.participants,
          repo        : repo || currentProject.repo,
          topic       : topic || currentProject.topic
        }
      )

      const newProject = await ProjectsModel.findOne({
        name: { $eq: newName || name }
      })

      return newProject
    } catch (err) {
      console.log(err)
      if(err.message) throw err

      throw new Error(
        'There was a problem while updating the requested project'
      )
    }
  }
}

export { Projects }
