"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Careers = void 0;

var _restifyRouter = require("restify-router");

var _careers = require("../controllers/careers");

const router = new _restifyRouter.Router();
exports.Careers = router;
const c = new _careers.Careers();
router.get('/careers', (req, res, next) => {
  res.send({
    message: 'This is the endpoint to upload the careers in the database.'
  });
});
router.post('/careers', async (req, res, next) => {
  const {
    body: {
      args
    }
  } = req;

  try {
    let result = await c.process(args);

    if (Array.isArray(result)) {
      result = result.map(({
        code,
        name
      }) => {
        return {
          code,
          name
        };
      });
      res.send({
        error: false,
        result
      });
    } else res.send({
      error: false,
      result: {
        _id: result._id,
        code: result.code,
        name: result.name
      }
    });
  } catch (err) {
    res.send({
      error: true,
      message: err.message
    });
  }
});