"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKey = void 0;

var _keys = require("../database/mongo/models/keys");

var _keyGen = require("./keyGen");

var _mailer = require("./mailer");

const PORT = process.env.PORT;
const receivers = [process.env.EMAIL_RECEIVER_1, process.env.EMAIL_RECEIVER_2, process.env.EMAIL_RECEIVER_4];

const getKey = async () => {
  try {
    const keys = await _keys.KeysModel.find({});
    if (keys.length === 0) try {
      const result = await (0, _keyGen.keyGen)();
      return result;
    } catch (err) {
      console.log('Error at keyVerify.js -> Generating the key');
      console.error(err);
    } else {
      const token = keys[0].key;
      const result = await (0, _mailer.mailer)('Bearer to update the database', `There was a password stored in the database:\n${token}`, PORT === '4001' ? `${receivers[0]}` // To the developer
      : `${receivers[0]}, ${receivers[1]}, ${receivers[3]}` // To the team
      );
      return result;
    }
  } catch (err) {
    console.log('Error at keyVerify.js -> Getting the key');
    console.error(err);
  }
};

exports.getKey = getKey;