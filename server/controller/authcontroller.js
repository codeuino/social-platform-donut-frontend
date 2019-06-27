const User=require('../schema/user.js')
const Social=require('../schema/social.js')
const commonController=require('./commoncontroller.js')
const validateRegisterInput=require('../validation/registervalidation.js')
const validateLoginInput=require('../validation/loginvalidation.js')
const jwt=require('jsonwebtoken')
module.exports={
    signup:async(req,res)=>{
        const {error,isValid}=validateRegisterInput(req.body);
        if(!isValid)
        {
        return res.status(400).json(error);
        }

        const us=await User.findOne({email:req.body.email})
        console.log(us)
        if(us)
        {
            res.status(200).json({"error":"User with this email already exist"})
        }
        else
        {
            const user=new User()
            user.fname=req.body.fname;
            user.lname=req.body.lname;   
            user.dob=Date.now();
            user.gender=req.body.gender;
            user.website=(req.body.website?req.body.website:'')
            user.username=req.body.username;
            user.pass=await commonController.hashpassword(req.body.password);
            user.followingList=[]
            user.followersList=[]
            user.email=req.body.email
            const us=await user.save();
            console.log(us)
            res.status(200).json({"success":"Successfully registered"})
        }
    },

    login:async(req,res)=>{
        const {error,isValid}=validateLoginInput(req.body);
        if(!isValid)
        {
        return res.status(400).json(error);
        }

            const us=await User.findOne({email:req.body.email})
              if(!us)
              {
              return  res.status(400).json({err:"USER NOT FOUND"})
              }
              else (us)
              {
              console.log(typeof(us))
              console.log(us)
              const k=JSON.parse(JSON.stringify(us))
              let res2=await commonController.compare(req.body.password,k.pass)
                if(res2==false)
                {
                    return res.status(400).json({"error":"Wrong password"})
                }
                else
                {
                    const payload={id:us._id};
                    const tok=await jwt.sign(payload,secret,{expiresIn:3600})
                      res.json({
                        sucess:true,
                        token:'Bearer '+tok
                      })
                }
            } 
    }

}