//STATUS 1 FOR SUCCESS
// STATUS 0 FOR FAILURE
const express = require('express');
const bodyparser = require('body-parser');
const url = bodyparser.urlencoded({ extended: false });
const passport = require('passport');
const route = express.Router();
const Authcontroller=require('../controller/authcontroller.js')
route.get('/google', passport.authenticate('google', { scope: ['profile'] }));
route.get('/google/redirect', passport.authenticate('google'), function(req,res){
  res.redirect('/profile/profile/:id');
});
route.get('/github', passport.authenticate('github'));
route.get('/github/redirect', passport.authenticate('github'), function(req,res){
  res.redirect('/profile/profile/:id');
});

route.get('/facebook', passport.authenticate('facebook'));

route.get('/facebook/redirect',passport.authenticate('facebook'),(req, res) => {
    res.redirect('/profile/profile/:id');
  }
);

route.post('/signup',url,Authcontroller.signup);
route.post('/login', url,Authcontroller.login);

route.get('/logout', function(req, res) {
  req.logout();
  res.send({
    msg:"User Logged Out",
    status:1
  });
});

module.exports = route;
