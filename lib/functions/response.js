"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.response = void 0;

const response = (res, status, err, message) => {
  res.send(status, {
    err: err,
    message
  });
};

exports.response = response;