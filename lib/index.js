"use strict";

var _restify = _interopRequireDefault(require("restify"));

var _restifyCorsMiddleware = _interopRequireDefault(require("restify-cors-middleware2"));

var _restifyRouter = require("restify-router");

var _routes = require("./routes/routes");

var _index = require("./database/mongo/connection/index");

var _getKey = require("./functions/getKey");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT;

const server = _restify.default.createServer();

const router = new _restifyRouter.Router();
const cors = (0, _restifyCorsMiddleware.default)({
  origins: ['*']
});
(0, _routes.applyRoutes)(router, server);
server.pre(cors.preflight);
server.use(cors.actual);
server.use(_restify.default.plugins.bodyParser());
server.listen(PORT, async () => {
  try {
    const result = await (0, _getKey.getKey)();
    console.log(result);
  } catch (err) {
    console.log('Error at index.js');
    console.error(err);
  }

  console.log(`Server running at port ${PORT}`);
});

_index.db.on('error', () => {
  console.log('There was an error while connecting to the database');
});

_index.db.once('open', () => {
  console.log('We are connected to the database!');
});