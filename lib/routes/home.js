"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var _restifyRouter = require("restify-router");

const router = new _restifyRouter.Router();
exports.Home = router;
router.get('', (req, res, next) => {
  res.json({
    message: 'Welcome to the new version of HARPER.'
  });
});