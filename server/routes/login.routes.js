//STATUS 1 FOR SUCCESS
// STATUS 0 FOR FAILURE


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
//  Sign Up route only renders user.ejs , no need for such route, we can replace with a static page :)
// route.get('/signup',url,function(req,res){
//   res.render('user.ejs')
// })

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
      res.send({
        msg:"Picture Cannot be upoloaded",
        status:0
      })
    })
    .then(function(use) {
      var default_height=300
      var default_width=300
      imagecontroller.ppResize(img,default_height,default_width)
      res.send({
        msg:"SUCCESS",
        status:1
      })
    });
});
//LOGIN ROUTE
route.post('/login', url, function(req, res) {
  user
    .findOne({ email: req.body.email })
    .lean()
    .then(function(data) {
      if (data.password == req.body.password) {
        console.log(data)
        res.send({
          msg:"User Logged In",
          Eid:data.eid,
          status:1
        })
      } else {
        res.status(200).send({
          msg:"Authentication Failed",
          status:0
        })
      }
    });
});

route.get('/logout', function(req, res) {
  req.logout();
  res.send({
    msg:"User Logged Out",
    status:1
  });
});

module.exports = route;
