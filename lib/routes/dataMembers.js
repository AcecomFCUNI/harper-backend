"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataMembers = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _restifyRouter = require("restify-router");

var _dataMembers = require("../controllers/dataMembers");

var _response = require("../functions/response");

var _ensureToken = require("../functions/ensureToken");

var _titleCase = require("../functions/titleCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SECRETE_KEY = process.env.SECRETE_KEY;
const router = new _restifyRouter.Router();
exports.DataMembers = router;
const d = new _dataMembers.DataMembers();
router.get('/dataMembers', (req, res, next) => {
  (0, _response.response)(res, 200, false, {
    message: 'This is the endpoint that returns the members data'
  });
});
router.post('/dataMembers', _ensureToken.ensureToken, async (req, res, next) => {
  const {
    body: {
      args
    },
    token
  } = req;

  _jsonwebtoken.default.verify(token, SECRETE_KEY, async (err, data) => {
    if (err) {
      console.log(err);
      (0, _response.response)(res, 403, true, {
        message: (0, _titleCase.toTitleCase)(err.message)
      });
    } else {
      try {
        const result = await d.process(args); // TODO: Update status depending of the args

        (0, _response.response)(res, 200, false, {
          result
        });
      } catch (err) {
        (0, _response.response)(res, 500, true, {
          message: err.message
        });
      } // TODO: learn what to do with the data


      console.log(data);
    }
  });
});