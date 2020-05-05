"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataMembers = void 0;

var _dataMembers = require("../database/mongo/models/dataMembers");

var _dataArea = require("./dataArea");

var _memberStatus = require("./memberStatus");

var _careers = require("./careers");

class DataMembers {
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

      case 'getOne':
        result = this.getOne(data);
        break;

      case 'getAll':
        result = this.getAll();
        break;

      case 'update':
        result = this.update(data);
        break;
    }

    return result;
  }

  async store(args) {
    const {
      area,
      birthday,
      career,
      code,
      email,
      git,
      key,
      lastName,
      name,
      phone,
      photo,
      status
    } = args;
    const c = new _careers.Careers();
    const da = new _dataArea.DataArea();
    const ms = new _memberStatus.MemberStatus();

    try {
      const data = await Promise.all([c.getOne({
        code: career
      }), da.getOne({
        name: area
      }), ms.getOne({
        name: status
      })]);
      const careerId = data[0]._id;
      const areaId = data[1]._id;
      const statusId = data[2]._id;
      const member = new _dataMembers.DataMembersModel({
        area: areaId,
        birthday: new Date(birthday),
        career: careerId,
        code,
        email,
        git,
        key,
        lastName,
        name,
        phone,
        photo,
        status: statusId
      });
      const result = await member.save();
      return result;
    } catch (err) {
      throw new Error('There was an error trying to save a new member');
    }
  }

  async getAll() {
    try {
      const result = await _dataMembers.DataMembersModel.find({});
      return result;
    } catch (error) {
      throw new Error('There was a problem trying to get all the members');
    }
  }

  async getOne(args) {
    const {
      code
    } = args;

    try {
      const result = await _dataMembers.DataMembersModel.find({
        code: {
          $eq: code
        }
      }, {
        __v: false
      });
      if (result.length === 0) throw new Error("The requested student doesn't exists.");
      return result[0];
    } catch (err) {
      if (err.message) throw err;
      throw new Error('The was a problem trying to get the requested student.');
    }
  }

  async update(args) {
    const {
      area,
      birthday,
      career,
      code,
      email,
      git,
      key,
      lastName,
      name,
      newCode,
      phone,
      photo,
      status
    } = args;
    const da = new _dataArea.DataArea();
    const ms = new _memberStatus.MemberStatus();

    try {
      if (!code) throw new Error('The code is mandatory!');
      let data; // data:
      //   - data[0]: current member
      //   - data[1]: new area
      //   - data[2]: new status

      if (area && status) data = await Promise.all([this.getOne({
        code
      }), da.getOne({
        name: area
      }), ms.getOne({
        name: status
      })]);else if (!area && status) {
        data = await Promise.all([this.getOne({
          code
        }), ms.getOne({
          name: status
        })]);
        data.push(null);
        const aux = data[1];
        data[1] = data[2];
        data[2] = aux;
      } else if (area && !status) {
        data = await Promise.all([this.getOne({
          code
        }), da.getOne({
          name: area
        })]);
        data.push(null);
      } // Update

      const newMember = {
        area: data[1] ? data[1]._id : data[0].area,
        birthday: birthday ? new Date(birthday) : data[0].birthday,
        career: career || data[0].career,
        code: newCode || data[0].code,
        // TODO: split the sended emails into an array, this is assuming there was just one email
        email: [email] || data[0].email,
        git: git || data[0].git,
        key: key || data[0].key,
        lastName: lastName || data[0].lastName,
        name: name || data[0].name,
        // TODO: split the sended phones into an array, this is assuming there was just one phone
        phone: [phone] || data[0].phone,
        photo: photo || data[0].photo,
        status: data[2] ? data[2]._id : data[0].status
      };
      await _dataMembers.DataMembersModel.findOneAndUpdate({
        code
      }, newMember);
      return this.getOne({
        code: newCode || code
      });
    } catch (err) {
      if (err.message) throw err;
      throw new Error('There was an error trying to update the requested member');
    }
  }

}

exports.DataMembers = DataMembers;