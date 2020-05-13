"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Projects = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _restifyRouter = require("restify-router");

var _projects = require("../controllers/projects");

var _response = require("../functions/response");

var _ensureToken = require("../functions/ensureToken");

var _titleCase = require("../functions/titleCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SECRETE_KEY = process.env.SECRETE_KEY;
const router = new _restifyRouter.Router();
exports.Projects = router;
const p = new _projects.Projects();
router.get('/projects', (req, res, next) => {
  (0, _response.response)(res, 200, false, {
    message: 'This is the endpoint to upload the projects from ACECOM\'s areas'
  });
});
router.post('/projects', _ensureToken.ensureToken, async (req, res, next) => {
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
        const result = await p.process(args); // TODO: Update status depending of the args

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