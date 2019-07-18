const express = require('express')
const Router = express.Router()
const controller = require('../controller/todos.controller')
const passport = require('passport')

Router.post('/addTodo',passport.authenticate('jwt',{session:false}), controller.addTodo)
Router.post('/completeTodo',passport.authenticate('jwt',{session:false}),controller.completeTodo)
Router.post('/deleteTodo',passport.authenticate('jwt',{session:false}),controller.deleteTodo)
Router.get('/getTodos',passport.authenticate('jwt',{session:false}),controller.getTodos)

module.exports = Router