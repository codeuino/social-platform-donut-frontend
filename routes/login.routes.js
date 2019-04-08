const express = require('express');
const bodyparser = require('body-parser');
const url = bodyparser.urlencoded({ extended: false });
const passport = require('passport');
const user = require('../schema/user.js');
const route = express.Router();
const multer=require('multer')

//MULTER
const storage=multer.diskStorage({
  dest: (req, file, cb) => {
    cb(null, './views/uploads/profilePics')
  },
  filename:function(req,file,cb){
      console.log(file)
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage
});


//get request

route.get('/google', passport.authenticate('google', { scope: ['profile'] }));

route.get('/google/redirect', passport.authenticate('google'), function(
  req,
  res
) {
  res.redirect('/profile/profile/:id');
});

route.get('/github', passport.authenticate('github'));
route.get('/github/redirect', passport.authenticate('github'), function(
  req,
  res
) {
  res.redirect('/profile/profile/:id');
});

route.get('/facebook', passport.authenticate('facebook'));

route.get(
  '/facebook/redirect',
  passport.authenticate('facebook'),
  (req, res) => {
    res.redirect('/profile/profile/:id');
  }
);
route.get('/signup',url,function(req,res){
  res.render('user.ejs')
})

//post request
//SIGNUP ROUTE
route.post('/userlogin',upload.single('profilepic'), function(req, res) {
  console.log(req.file)
  new user({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    dob: req.body.dob,
    github: req.body.github,
    username: req.body.username,
    pass: req.body.pass,
    follower: 0,
    following: 0,
    status: 'idle',
    Eid: Math.floor(Math.random() * 1000000),
    profilePicture:"oldMan.jpeg",

  })
    .save()
    .catch((err)=>{
      res.send("ERROR")
    })
    .then(function(use) {
      //Right now it render index page because no login page is created yet so 
      res.send(use)
      //res.send("WELCOME TO CODEUINO, you can now login")
    });
});
//LOGIN ROUTE
route.post('/login', url, function(req, res) {
  user
    .findOne({ email: req.body.email })
    .lean()
    .then(function(data) {
      if (data.compare(req.body.password)) {
        res.redirect('/profile/profile/' + data.eid);
      } else {
        res.redirect('/');
      }
    });
});

route.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = route;
