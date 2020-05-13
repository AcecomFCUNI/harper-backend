"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeysModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const Keys = new Schema({
  createdAt: {
    default: Date.now,
    type: Date,
    unique: true
  },
  key: {
    type: String,
    unique: true
  }
}, {
  collection: 'keys'
});
Keys.plugin(_mongooseUniqueValidator.default);

const KeysModel = _mongoose.default.model('Keys', Keys);

exports.KeysModel = KeysModel;