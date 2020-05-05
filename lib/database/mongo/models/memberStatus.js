"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberStatusModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const MemberStatus = new Schema({
  name: {
    required: true,
    type: String,
    unique: true
  }
}, {
  collection: 'memberStatus'
});
MemberStatus.plugin(_mongooseUniqueValidator.default);

const MemberStatusModel = _mongoose.default.model('MemberStatus', MemberStatus);

exports.MemberStatusModel = MemberStatusModel;