const express = require('express');
const bodyparser = require('body-parser');
var url = bodyparser.urlencoded({ extended: false });
const passport = require('passport');
const user = require('../schema/user.js');
const route = express.Router();

//get request

route.get('/', function(req, res) {
  res.render('all');
});

route.get('/google', passport.authenticate('google', { scope: ['profile'] }));

route.get('/google/redirect', passport.authenticate('google'), function(
  req,
  res
) {
  res.redirect('/profile/:id');
});

//post request
route.post(
  '/login',
  url,
  passport.authenticate('local.LogIn', {
    successRedirect: '/profile/:id',
    failureRedirect: '/'
  })
);

route.post(
  '/userlogin',
  url,
  passport.authenticate('local.SignUp', {
    successRedirect: '/profile/:id',
    failureRedirect: '/'
  })
);

module.exports = route;