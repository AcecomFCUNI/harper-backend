"use strict";

var _restify = _interopRequireDefault(require("restify"));

var _restifyCorsMiddleware = _interopRequireDefault(require("restify-cors-middleware"));

var _restifyRouter = require("restify-router");

var _home = require("./routes/home");

var _careers = require("./routes/careers");

var _memberStatus = require("./routes/memberStatus");

var _dataArea = require("./routes/dataArea");

var _dataMembers = require("./routes/dataMembers");

var _projects = require("./routes/projects");

var _index = require("./database/mongo/connection/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT;

const server = _restify.default.createServer();

const router = new _restifyRouter.Router();
const cors = (0, _restifyCorsMiddleware.default)({
  origins: ['*']
});
router.add('/', _home.Home);
router.add('/api', _careers.Careers);
router.add('/api', _memberStatus.MemberStatus);
router.add('/api', _dataArea.DataArea);
router.add('/api', _dataMembers.DataMembers);
router.add('/api', _projects.Projects);
router.applyRoutes(server);
server.pre(cors.preflight);
server.use(cors.actual);
server.use(_restify.default.plugins.bodyParser());
server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

_index.db.on('error', () => {
  console.log('There was an error while connecting to the database');
});

_index.db.once('open', () => {
  console.log('We are connected to the database!');
});