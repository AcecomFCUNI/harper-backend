"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectsModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const Projects = new Schema({
  area: {
    ref: 'DataArea',
    required: true,
    type: Schema.Types.ObjectId
  },
  description: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String,
    unique: true
  },
  participants: [{
    ref: 'DataMembers',
    required: true,
    type: Schema.Types.ObjectId
  }],
  repo: [{
    default: '',
    type: String
  }],
  topic: {
    required: true,
    type: String
  }
}, {
  collection: 'projects'
});
Projects.plugin(_mongooseUniqueValidator.default);

const ProjectsModel = _mongoose.default.model('Projects', Projects);

exports.ProjectsModel = ProjectsModel;