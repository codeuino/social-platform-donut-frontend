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
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
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
  user.findOne({email:req.body.email}).then((use)=>{
    if(!use)
    {
    return  res.status(400).json({err:"USER NOT PRESENT"})
    }
    if(use)
    {
    console.log(typeof(use))
    console.log(use)
    //have to convert object to string then access keys
    const k=JSON.parse(JSON.stringify(use)).password

      bcrypt.compare(req.body.password,k).then((val)=>{
        if(val==false)
        {
          return res.status(400).json({err:"Password is wrong"})
        }
        else
        {
          const payload={id:use.Eid,name:use.first_name}
            jwt.sign(payload,'blabla',{expiresIn:3600},(err,token)=>{
              res.json({
                success:true,
                token:'Bearer '+token
              })
          })
        }
      })

    }
  })
});
//test route for jwt
route.get('/check',passport.authenticate('jwt',{session:false}),(req,res)=>{
  console.log(req.user)
})
route.get('/logout', function(req, res) {
  req.logout();
  res.send({
    msg:"User Logged Out",
    status:1
  });
});

module.exports = route;
