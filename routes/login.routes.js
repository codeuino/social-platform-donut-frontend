const express = require('express');
const bodyparser = require('body-parser');
const url = bodyparser.urlencoded({ extended: false });
const passport = require('passport');
const user = require('../schema/user.js');
const route = express.Router();
const multer=require('multer')

//MULTER
const storage=multer.diskStorage({
  destination:'./public/uploads',
  filename:function(req,file,cb){
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage,
  limits:{fileSize:1000000},
  fileFilter:function(req,res,cb){
    checkFileType(file,cb);
  }
}).single('myImage')

function checkFileType(file,cb){
  const fileTypes=/jpeg|jpg|png|gif/;
  const extname=fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype=fileTypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  }else{
    cb('Error:Images only')
  }
}
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
route.post('/userlogin', url, function(req, res) {
  console.log(req.file)
  let img=""
  upload(req,res,(err)=>{
    if(req.file===undefined){
      img="oldMan.jpeg"
    }else{
      img=req.file.filename
    }
  })
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
      //Right now it render index page because no login page is created yet so 
      res.send({use})
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
