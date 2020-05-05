"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Projects = void 0;

var _projects = require("../database/mongo/models/projects");

var _dataArea = require("../database/mongo/models/dataArea");

var _dataMembers = require("../database/mongo/models/dataMembers");

class Projects {
  process(args) {
    const {
      type,
      data
    } = args;
    let result;

    switch (type) {
      case 'store':
        result = this.store(data);
        break;

      case 'getAll':
        result = this.getAll();
        break;

      case 'getOne':
        result = this.getOne(data);
        break;

      case 'getProjectsPerArea':
        result = this.getProjectPerArea(data);
        break;

      case 'update':
        result = this.update(data);
    }

    return result;
  }

  async store(args) {
    const {
      area,
      description,
      name,
      participants,
      repo,
      topic
    } = args;
    if (!area) throw new Error('The area is mandatory!');
    if (!description) throw new Error('The description is mandatory!');
    if (!name) throw new Error('The name is mandatory!');
    if (!participants) throw new Error('The participants are mandatory!');
    if (!topic) throw new Error('The topic is mandatory!');
    const studentCodes = participants.split(/[ ,]+/);
    let repoUrls = null;
    if (repo) repoUrls = repo.split(/[ ,]+/);

    try {
      // data:
      //  - data[0]: areaId
      //  - data[1]: participantIds
      const data = await Promise.all([_dataArea.DataAreaModel.findOne({
        name: area
      }, {
        _id: true
      }), _dataMembers.DataMembersModel.find({
        code: {
          $in: studentCodes
        }
      }, {
        _id: true
      })]);
      let projects;
      if (repoUrls) projects = new _projects.ProjectsModel({
        area: data[0],
        description,
        name,
        participants: data[1],
        repo: repoUrls,
        topic
      });else projects = new _projects.ProjectsModel({
        area: data[0],
        description,
        name,
        participants: data[1],
        topic
      });
      const result = await projects.save();
      return result;
    } catch (err) {
      if (err.message) throw err;
      throw new Error('There was an error while trying to store the project');
    }
  }

  async getAll() {
    try {
      const projects = await _projects.ProjectsModel.find({}, {
        __v: false
      });
      return projects;
    } catch (err) {
      throw new Error('There was an error while trying to get all the projects');
    }
  }

  async getOne(args) {
    const {
      name
    } = args;

    try {
      const project = await _projects.ProjectsModel.findOne({
        name: {
          $eq: name
        }
      }, {
        __v: false
      });
      return project;
    } catch (err) {
      throw new Error('There was a problem while trying to get the requested project');
    }
  }

  async getProjectsPerArea(args) {
    const {
      area
    } = args;

    try {
      const result = await _projects.ProjectsModel.find({
        area: {
          $eq: area
        }
      }, {
        __v: false
      });
      return result;
    } catch (err) {
      throw new Error('There was a problem while trying to get all the requested projects.');
    }
  }

  async update(args) {
    const {
      area,
      description,
      name,
      newName,
      participants,
      repo,
      topic
    } = args;
    if (!name) throw new Error('The name is mandatory!'); // data:
    //   - data[0]: areaId
    //   - data[1]: participantIds

    let data = [];

    try {
      if (area && participants) data = await Promise.all([_dataArea.DataAreaModel.findOne({
        name: {
          $eq: area
        }
      }, {
        _id: true
      }), _dataMembers.DataMembersModel.find({
        code: {
          $in: participants
        }
      }, {
        _id: true
      })]);else if (area && !participants) {
        data.push(await _dataArea.DataAreaModel.findOne({
          name: {
            $eq: area
          }
        }, {
          _id: true
        }));
        data.push(null);
      } else if (!area && participants) {
        data.push(null);
        data.push(await _dataMembers.DataMembersModel.find({
          code: {
            $in: participants
          }
        }, {
          _id: true
        }));
      } else {
        data.push(null);
        data.push(null);
      }
      const currentProject = await _projects.ProjectsModel.findOne({
        name: {
          $eq: name
        }
      });
      await _projects.ProjectsModel.findOneAndUpdate({
        name: {
          $eq: name
        }
      }, {
        area: data[0] || currentProject.area,
        description: description || currentProject.description,
        name: newName || name,
        participants: data[1] || currentProject.participants,
        repo: repo || currentProject.repo,
        topic: topic || currentProject.topic
      });
      const newProject = await _projects.ProjectsModel.findOne({
        name: {
          $eq: newName || name
        }
      });
      return newProject;
    } catch (err) {
      console.log(err);
      if (err.message) throw err;
      throw new Error('There was a problem while updating the requested project');
    }
  }

}

exports.Projects = Projects;