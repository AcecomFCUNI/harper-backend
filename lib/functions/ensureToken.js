"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureToken = void 0;

var _response = require("./response");

const ensureToken = (req, res, next) => {
  const {
    headers: {
      authorization: bearerHeader
    }
  } = req;

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
  } else (0, _response.response)(res, 403, true, {
    message: 'You are not allowed to use this endpoint.'
  }); // TODO: send a report that someone try to access to a route.


  next();
};

exports.ensureToken = ensureToken;