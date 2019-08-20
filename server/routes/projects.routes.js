const express = require('express');
const Router = express.Router();
const controller = require('../controller/project.controller');
const passport = require('passport');
Router.post(
  '/addProject',
  passport.authenticate('jwt', { session: false }),
  controller.addProject
);
Router.post(
  '/fetchProjects',
  passport.authenticate('jwt', { session: false }),
  controller.fetchProjects
);
Router.post(
  '/fetchProject',
  passport.authenticate('jwt', { session: false }),
  controller.fetchProject
);
Router.post(
  '/addComment',
  passport.authenticate('jwt', { session: false }),
  controller.addComment
);
Router.post(
  '/addVote',
  passport.authenticate('jwt', { session: false }),
  controller.upVoteDownVote
);
Router.post(
  '/LikedProjects',
  passport.authenticate('jwt', { session: false }),
  controller.LikedProjects
);

module.exports = Router;
