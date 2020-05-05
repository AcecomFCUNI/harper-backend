"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataMembersModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const DataMembers = new Schema({
  area: {
    ref: 'DataArea',
    required: true,
    type: Schema.Types.ObjectId
  },
  birthday: {
    required: true,
    type: Date
  },
  career: {
    ref: 'Careers',
    type: Schema.Types.ObjectId
  },
  code: {
    maxlength: 9,
    minlength: 9,
    required: true,
    type: String,
    unique: true
  },
  email: [{
    required: true,
    type: String,
    unique: true
  }],
  git: String,
  key: Boolean,
  lastName: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  phone: [{
    type: String,
    unique: true
  }],
  photo: {
    default: '',
    type: String
  },
  status: {
    ref: 'MemberStatus',
    type: Schema.Types.ObjectId
  }
}, {
  collection: 'dataMembers'
});
DataMembers.plugin(_mongooseUniqueValidator.default);

const DataMembersModel = _mongoose.default.model('DataMembers', DataMembers);

exports.DataMembersModel = DataMembersModel;