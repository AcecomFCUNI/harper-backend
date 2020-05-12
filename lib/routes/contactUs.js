"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactUs = void 0;

var _restifyRouter = require("restify-router");

var _contactUs = require("../controllers/contactUs");

const router = new _restifyRouter.Router();
exports.ContactUs = router;
const cu = new _contactUs.ContactUs();
router.get('/contactUs', (req, res) => {
  res.send({
    message: 'This is the endpoint to contact to ACECOM'
  });
});
router.post('/contactUs', async (req, res, next) => {
  const {
    body: {
      args
    }
  } = req;

  try {
    const result = await cu.process(args);
    res.send(200, {
      error: false,
      message: result
    });
  } catch (err) {
    res.send(500, {
      error: true,
      message: err.message
    });
  }
});