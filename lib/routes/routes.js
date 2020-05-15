"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyRoutes = void 0;

var _home = require("./home");

var _careers = require("./careers");

var _memberStatus = require("./memberStatus");

var _dataArea = require("./dataArea");

var _dataMembers = require("./dataMembers");

var _projects = require("./projects");

var _contactUs = require("./contactUs");

const routes = [_careers.Careers, _contactUs.ContactUs, _dataArea.DataArea, _dataMembers.DataMembers, _memberStatus.MemberStatus, _projects.Projects];

const applyRoutes = (router, server) => {
  router.add('/', _home.Home);
  routes.forEach(route => {
    router.add('/api', route);
  });
  router.applyRoutes(server);
};

exports.applyRoutes = applyRoutes;