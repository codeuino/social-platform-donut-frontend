const express = require('express');
const route = express.Router();
const controller=require('../controller/posts.controller')
route.post('/add',controller.add)//Add route
route.post('/delete',controller.delete)//Delete Route
route.get('/show',controller.show)//Show all posts
route.post('/schedule',controller.schedule)//Schedule Posts
route.post('/update',controller.update)//Update posts
module.exports = route;
