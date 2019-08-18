const express = require('express');
const route = express.Router();
const passport = require('passport')
const controller=require('../controller/posts.controller')
route.post('/add',passport.authenticate('jwt',{session:false}),controller.add)//Add route
route.post('/delete',passport.authenticate('jwt',{session:false}),controller.delete)//Delete Route
route.get('/show',passport.authenticate('jwt',{session:false}),controller.show)//Show all posts
route.post('/schedule',passport.authenticate('jwt',{session:false}),controller.schedule)//Schedule Posts
route.post('/update',passport.authenticate('jwt',{session:false}),controller.update)//Update posts
module.exports = route;
