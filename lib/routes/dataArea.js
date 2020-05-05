"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataArea = void 0;

var _restifyRouter = require("restify-router");

var _dataArea = require("../controllers/dataArea");

const router = new _restifyRouter.Router();
exports.DataArea = router;
const da = new _dataArea.DataArea();
router.get('/dataArea', (req, res, next) => {
  res.send({
    message: 'This is the endpoint to upload data of an area.'
  });
});
router.post('/dataArea', async (req, res, next) => {
  const {
    body: {
      args
    }
  } = req;

  try {
    const result = await da.process(args);
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