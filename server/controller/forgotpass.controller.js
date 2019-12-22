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
    // POST /getById/:email on change pass button click 
    getById:async(req,res)=>{
      try{
        const { email } = req.params;
        let user = await User.findOne({email: email});
        console.log(user.pass)
        var mailOptions = {
            from: cred.user,
            to: email,
            subject: 'Forgot Password',
            text: `Hi please use this link ${os.hostname}/forgot/${email}/${user.pass}`
          };
          // sending email with links to change pass  
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.status(500).json({success: false, msg: 'Error in sending email!' + err });
            } else {
              res.status(200).json({success: true, msg : 'Successfully sent email to change password!'});
              console.log('Email sent: ' + info.response);
            }
          });}
          catch (err) {
            console.log(err)
            res.status(404).json({
                success: false,
                msg:'Failed to get user',
                err: err
            })
        }         
    },
    changePass: async(req,res)=>{
      try{
      // take the value of email and pass from form to change pass
      const { email, pass } = req.body;
      let user = await User.findOne({email: email, pass: pass});
      if(user)
      {
        // change the user password 
        user.pass = pass;
        // hashing is already done pre save hooks in UserSchema 
        const data = await user.save();
        res.json({
          success: true,
          msg:'Successfully changed the password',
          email: data.email
        });
      }
      else{
        res.status(404).json({
          success: false,
          msg: `User with ${email} email is not found!`
        });
      }
    }
    catch(err){
      console.log(err)
      res.status(400).json({
          success: false,
          msg:'Failed to change password',
          err: err
      })
    }
}
}