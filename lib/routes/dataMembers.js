"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataMembers = void 0;

var _restifyRouter = require("restify-router");

var _dataMembers = require("../controllers/dataMembers");

const router = new _restifyRouter.Router();
exports.DataMembers = router;
const d = new _dataMembers.DataMembers();
router.get('/dataMembers', (req, res, next) => {
  res.send({
    message: 'This is the endpoint that returns the members data.'
  });
});
router.post('/dataMembers', async (req, res, next) => {
  const {
    body: {
      args
    }
  } = req;

  try {
    const result = await d.process(args);
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