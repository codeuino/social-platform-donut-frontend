const express = require('express');
const bodyparser = require('body-parser')
var url = bodyparser.urlencoded({ extended: false });
const passport = require('passport');
const user = require('../schema/user.js');
const route = express.Router();


//get request



route.get('/google', passport.authenticate('google', { scope: ['profile'] }));

route.get('/google/redirect', passport.authenticate('google'), function (req, res) {
  res.redirect('/profile/profile/:id');

})

route.get('/github', passport.authenticate('github'));
route.get('/github/redirect', passport.authenticate('github'), function (req, res) {
  res.redirect('/profile/profile/:id');
})
//post request

route.post('/userlogin', url, function (req, res) {
  new user({
    "fname": req.body.fname, "lname": req.body.lname, "email": req.body.email, "dob": req.body.dob, "github": req.body.github, "username": req.body.username, "pass": req.body.pass, "follower": 0, "following": 0, "status": 'idle', "Eid": Math.floor(Math.random() * 1000000)
  }).save().then(function (use) {
    res.render('user', { user: use });
  })
});

route.post('/login', url, function (req, res) {
  user.findOne({ email: req.body.email }).then(function (data) {

    if (data.compare(req.body.password)) {
      res.redirect('/profile/profile/' + data.eid);
    }
    else {
      res.redirect('/');
    }


  })


})
route.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = route;
