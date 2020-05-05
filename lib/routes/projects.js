"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Projects = void 0;

var _restifyRouter = require("restify-router");

var _projects = require("../controllers/projects");

const router = new _restifyRouter.Router();
exports.Projects = router;
const p = new _projects.Projects();
router.get('/projects', (req, res, next) => {
  res.send({
    message: 'This is the endpoint to upload the projects from ACECOM\'s areas.'
  });
});
router.post('/projects', async (req, res, next) => {
  const {
    body: {
      args
    }
  } = req;

  try {
    const result = await p.process(args);
    res.send({
      error: false,
      result
    });
  } catch (err) {
    // console.log(err)
    res.send({
      error: true,
      message: err.message
    });
  }
});