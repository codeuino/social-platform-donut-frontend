const EventController = require('../controller/events.controller')
const express = require('express')
const Router = express.Router()
const passport = require('passport')
Router.post('/addEvent',passport.authenticate('jwt',{session:false}),EventController.addEvent)
Router.post('/addMembers',passport.authenticate('jwt',{session:false}),EventController.addMembers)
Router.post('/updateEvent',passport.authenticate('jwt',{session:false}),EventController.updateEvent)
Router.post('/changeStatus',passport.authenticate('jwt',{session:false}),EventController.changeStatus)
Router.post('/fetchEvent',passport.authenticate('jwt',{session:false}),EventController.fetchEvent)
Router.post('/fetchEvents',passport.authenticate('jwt',{session:false}),EventController.fetchEvents)
 Router.post('/attendEvent',passport.authenticate('jwt',{session:false}),EventController.attendEvent)

module.exports=Router