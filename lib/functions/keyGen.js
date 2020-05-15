"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyGen = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mailer = require("./mailer");

var _keys = require("../database/mongo/models/keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRETE_KEY;
const ID = process.env.ID;
const receivers = [process.env.EMAIL_RECEIVER_1, process.env.EMAIL_RECEIVER_2, process.env.EMAIL_RECEIVER_4];

const keyGen = async () => {
  try {
    const token = _jsonwebtoken.default.sign({
      id: ID
    }, SECRET_KEY);

    const km = new _keys.KeysModel({
      key: token
    });

    try {
      await km.save();
    } catch (err) {
      console.log('Error at keyGen.js -> Saving the key.');
    }

    const result = await (0, _mailer.mailer)('New bearer to update the database', PORT === '4001' ? `This bearer is just for testing purposes.\nThe new password to update the database: \n${token}` : `This bearer is ready to be used in production.\nThe new password to update the database: \n${token}`, PORT === '4001' ? `${receivers[0]}` // To the developer
    : `${receivers[0]}, ${receivers[1]}, ${receivers[2]}` // To the team
    );
    return result;
  } catch (err) {
    console.log('Error at keyGen.js -> Generating the key with jwt.');
    console.error(err);
  }
};

exports.keyGen = keyGen;