const express = require('express');
const bodyparser = require('body-parser');
const url = bodyparser.urlencoded({ extended: false });
const passport = require('passport');
const user = require('../schema/user.js');
const route = express.Router();
const multer=require('multer')
const path=require('path')
const Jimp=require('jimp')
const imagecontroller=require('../controller/image.controller')

//MULTER
const storage=multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './views/uploads/profilePics')
  },
  filename:function(req,file,cb){
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
  let img=""
  if(req.file){
    img=req.file.filename
  }else{
    img="oldMan.jpeg"
  }
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
    profilePicture:img,

  })
    .save()
    .catch((err)=>{
      res.send("ERROR")
    })
    .then(function(use) {
      var default_height=300
      var default_width=300
      imagecontroller.ppResize(img,default_height,default_width)
      res.send(use)
    });
});
//LOGIN ROUTE
route.post('/login', url, function(req, res) {
  user
    .findOne({ email: req.body.email })
    .lean()
    .then(function(data) {
      if (data.password == req.body.password) {
        res.redirect('/profile/profile/' + data.eid);
        // console.log('pass matched');
      } else {
        res.redirect('/');
        // console.log('did not match');
      }
    });
});

route.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = route;
