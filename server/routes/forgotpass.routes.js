const express = require('express');
const Router = express.Router();
const passport = require('passport');
const controller= require('../controller/forgotpass.controller')
Router.post(
    '/getById/:email',
    controller.getById
  );
Router.get(
    '/changePass',
    controller.changePass
)

module.exports = Router