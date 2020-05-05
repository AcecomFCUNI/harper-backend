"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Careers = void 0;

var _careers = require("../database/mongo/models/careers");

class Careers {
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
      code,
      name
    } = args;
    const career = new _careers.CareersModel({
      code,
      name
    });

    try {
      const result = await career.save();
      return result;
    } catch (err) {
      throw new Error('There was a problem trying to store the career in the database');
    }
  }

  async getAll() {
    try {
      const careers = await _careers.CareersModel.find({});
      return careers;
    } catch (err) {
      throw new Error('There was an error trying to get all the careers');
    }
  }

  async getOne(args) {
    const {
      code
    } = args;

    try {
      const career = await _careers.CareersModel.findOne({
        code: {
          $eq: code
        }
      }, {
        __v: false
      });
      if (!career) throw new Error("The requested career doesn't exists.");
      return career;
    } catch (err) {
      if (err.message) throw err;
      throw new Error('There was a problem trying to get the requested career');
    }
  }

}

exports.Careers = Careers;