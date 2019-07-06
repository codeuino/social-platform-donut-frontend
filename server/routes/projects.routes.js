const express = require('express')
const Router = express.Router()
const controller = require('../controller/project.controller')
const passport = require('passport')
Router.post('/addPost',passport.authenticate('jwt',{session:false}), controller.addProject)
module.exports = Router