"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberStatus = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _restifyRouter = require("restify-router");

var _memberStatus = require("../controllers/memberStatus");

var _response = require("../functions/response");

var _ensureToken = require("../functions/ensureToken");

var _titleCase = require("../functions/titleCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SECRETE_KEY = process.env.SECRETE_KEY;
const router = new _restifyRouter.Router();
exports.MemberStatus = router;
const ms = new _memberStatus.MemberStatus();
router.get('/memberStatus', (req, res, next) => {
  (0, _response.response)(res, 200, false, {
    message: 'This is the endpoint that returns the member status data'
  });
});
router.post('/memberStatus', _ensureToken.ensureToken, async (req, res, next) => {
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
        const result = await ms.process(args); // TODO: Update status depending of the args

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