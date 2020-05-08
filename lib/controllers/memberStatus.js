"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberStatus = void 0;

var _memberStatus = require("../database/mongo/models/memberStatus.js");

class MemberStatus {
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
    }

    return result;
  }

  async store(args) {
    const {
      name
    } = args;
    const memberStatus = new _memberStatus.MemberStatusModel({
      name
    });

    try {
      const result = await memberStatus.save();
      return result;
    } catch (err) {
      throw new Error('There was an error trying to store the requested member status');
    }
  }

  async getAll() {
    try {
      const result = await _memberStatus.MemberStatusModel.find({}, {
        __v: false,
        _id: false
      });
      return result;
    } catch (err) {
      throw new Error('There was an error trying to get all the member status');
    }
  }

  async getOne(args) {
    const {
      name
    } = args;

    try {
      const result = await _memberStatus.MemberStatusModel.find({
        name: {
          $eq: name
        }
      }, {
        __v: false,
        _id: false
      });
      if (!result) throw new Error("The requested member status doesn't exist.");
      return result[0];
    } catch (err) {
      if (err.message) throw err;
      throw new Error('There was an error trying to get the requested member status');
    }
  }

}

exports.MemberStatus = MemberStatus;