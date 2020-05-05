"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CareersModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const Careers = new Schema({
  code: {
    maxlength: 2,
    minlength: 2,
    type: String,
    unique: true
  },
  name: {
    type: String,
    unique: true
  }
}, {
  collection: 'careers'
});
Careers.plugin(_mongooseUniqueValidator.default);

const CareersModel = _mongoose.default.model('Careers', Careers);

exports.CareersModel = CareersModel;