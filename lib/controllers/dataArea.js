"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataArea = void 0;

var _dataArea = require("../database/mongo/models/dataArea");

class DataArea {
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
        break;

      case 'update':
        result = this.update(data);
    }

    return result;
  }

  async store(args) {
    const {
      abstract,
      image,
      name
    } = args;

    try {
      const areaStored = await _dataArea.DataAreaModel.find({}).sort({
        code: -1
      }).limit(1);
      let dataArea;

      if (areaStored.length > 0) {
        const code = areaStored[0].code + 1;
        dataArea = new _dataArea.DataAreaModel({
          abstract,
          code,
          image,
          name
        });
      } else dataArea = new _dataArea.DataAreaModel({
        abstract,
        image,
        name
      });

      const result = await dataArea.save();
      return {
        abstract: result.abstract,
        code: result.code,
        image: result.image,
        name: result.name
      };
    } catch (err) {
      console.log(err);
      throw new Error('There was a problem trying to store the area.');
    }
  }

  async getAll() {
    try {
      const result = await _dataArea.DataAreaModel.find({}, {
        __v: false,
        _id: false
      });
      return result;
    } catch (err) {
      throw new Error('There was a problem trying to get all the areas.');
    }
  }

  async getOne(args) {
    const {
      name
    } = args;

    try {
      const result = await _dataArea.DataAreaModel.find({
        name: {
          $eq: name
        }
      }, {
        __v: false,
        _id: false
      });
      if (!result) throw new Error("The requested area doesn't exist.");
      return result[0];
    } catch (err) {
      if (err.message) throw err;
      throw new Error('There was a problem trying to get the requested areas.');
    }
  }

  async update(args) {
    const {
      abstract,
      image,
      name
    } = args;
    if (!abstract && !image) throw new Error("There's nothing to update!");else if (abstract && !image) try {
      await _dataArea.DataAreaModel.findOneAndUpdate({
        name: {
          $eq: name
        }
      }, {
        abstract: abstract
      });
    } catch (error) {
      throw new Error('There was a problem trying to update the area');
    } else if (!abstract && image) try {
      await _dataArea.DataAreaModel.findOneAndUpdate({
        name: {
          $eq: name
        }
      }, {
        image: image
      });
    } catch (error) {
      throw new Error('There was a problem trying to update the area');
    } else try {
      await _dataArea.DataAreaModel.findOneAndUpdate({
        name: {
          $eq: name
        }
      }, {
        abstract: abstract,
        image: image
      });
    } catch (error) {
      throw new Error('There was a problem trying to update the area');
    }
    const result = await _dataArea.DataAreaModel.findOne({
      name: {
        $eq: name
      }
    });
    return result;
  }

}

exports.DataArea = DataArea;