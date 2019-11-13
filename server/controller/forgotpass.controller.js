const User = require('../schema/user')
var nodemailer = require('nodemailer');
var os = require("os");
var cred=require("../config/credential.js")
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: cred.user,
      pass: cred.pass
    }
  });
module.exports={
    getById:async(req,res)=>{
      try{
        let user=await User.findOne({email:req.body.email});
        console.log(user.pass)
        var mailOptions = {
            from: cred.user,
            to: req.body.email,
            subject: 'Forgot Password',
            text: `Hi please use this link ${os.hostname}/forgot/${req.body.email}/${user.pass}`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });}
          catch (err) {
            console.log(err)
            res.status(400).json({
                status:0,
                msg:'Failed to get user'
            })
        }         
    },
    changePass: async(req,res)=>{
      try{
      let user=await User.findOne({email:req.params.email,pass:req.params.pass});
      if(user)
      {
        res.json({
          status:1,
          msg:'Success',
          email:req.param.email
      })
      }
      else{
        res.status(404).json({
          status:0,
          msg:'No user found'
      }) 
      }
    }
    catch(err){
      console.log(err)
            res.status(400).json({
                status:0,
                msg:'Failed to change password'
            })
    }
}
}