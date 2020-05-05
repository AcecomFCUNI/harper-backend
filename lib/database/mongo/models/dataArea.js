"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataAreaModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const DataArea = new Schema({
  abstract: {
    required: true,
    type: String
  },
  code: {
    default: 1,
    type: Number
  },
  image: {
    default: '',
    type: String
  },
  name: {
    required: true,
    type: String,
    unique: true
  }
}, {
  collection: 'dataArea'
});
DataArea.plugin(_mongooseUniqueValidator.default);

const DataAreaModel = _mongoose.default.model('DataArea', DataArea);

exports.DataAreaModel = DataAreaModel;