const express = require('express');
const Router = express.Router();
const passport = require('passport');
const controller= require('../controller/forgotpass.controller')
Router.post(
    '/getById',
    controller.getById
  );
Router.get(
    '/:email/:pass',
    controller.changePass
)