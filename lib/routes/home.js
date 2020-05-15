"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var _restifyRouter = require("restify-router");

var _response = require("../functions/response");

const router = new _restifyRouter.Router();
exports.Home = router;
router.get('', (req, res, next) => {
  (0, _response.response)(res, 200, false, {
    message: 'Welcome to the new version of HARPER'
  });
});