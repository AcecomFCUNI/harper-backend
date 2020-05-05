"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberStatus = void 0;

var _restifyRouter = require("restify-router");

var _memberStatus = require("../controllers/memberStatus");

const router = new _restifyRouter.Router();
exports.MemberStatus = router;
const ms = new _memberStatus.MemberStatus();
router.get('/memberStatus', (req, res, next) => {
  res.send({
    message: 'This is the endpoint that returns the member status data.'
  });
});
router.post('/memberStatus', async (req, res, next) => {
  const {
    body: {
      args
    }
  } = req;

  try {
    const result = await ms.process(args);
    res.send({
      error: false,
      result
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message
    });
  }
});