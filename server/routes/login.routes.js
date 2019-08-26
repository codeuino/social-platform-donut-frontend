//STATUS 1 FOR SUCCESS
// STATUS 0 FOR FAILURE
const express = require('express');
const jwt = require('jsonwebtoken')
const _=require('lodash')
const secret ='mySecret'
const bodyparser = require('body-parser');
const url = bodyparser.urlencoded({ extended: false });
const passport = require('passport');
const route = express.Router();
const UserModel = require('../schema/user')
const OrgModel = require('../schema/organisation')
const Authcontroller=require('../controller/authcontroller.js')
route.post('/google', passport.authenticate('google', { scope: ['profile'] }));
route.get('/google/redirect', passport.authenticate('google'), function(req,res){
  res.json(req.user)
});
route.post('/googleLogin',url,async (req,res)=>{
  let user
  try {
    user = await UserModel.findOne({email:req.body.email})
    if(!user) {
      user = await OrgModel.findOne({email:req.body.email})
    }
    if(user) {
      if(user.googleId) {
        if(user.googleId === req.body.googleID) {
          const payload={id:user._id,email:user.email,type:user.type};
          const tok=await jwt.sign(payload,secret)
          var u = await _.pick(user,['name','_id','type','navbarName'])
          res.json({status:1,token:'Bearer  ' + tok,user:u})
        }else {
          res.json({status:0})
        }
      }
    }else{
      res.json({
        status:0,
        msg:"User doesn't Exist"
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      status:0,
      msg:"User doesn't Exist"
    })
  }
  
})
route.get('/github', passport.authenticate('github'));
route.get('/github/redirect', passport.authenticate('github'), Authcontroller.github);

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
