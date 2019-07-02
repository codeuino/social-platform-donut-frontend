const User=require('../schema/user.js')
const Organisation=require('../schema/organisation.js')
const Social=require('../schema/social.js')
const validateRegisterInput=require('../validation/registervalidation.js')
const validateLoginInput=require('../validation/loginvalidation.js')
const jwt=require('jsonwebtoken')
const commonController = require('../controller/commoncontroller')
const {secret} = require('../config/credential')
module.exports={
    signup:async(req,res)=>{
        const {error,isValid}=validateRegisterInput(req.body);
        if(!isValid)
        {
        return res.status(400).json({error,status: 0});
        }

        const us=await User.findOne({email:req.body.email})
        console.log(us)
        if(us)
        {
            res.status(200).json({"error":"User with this email already exist", status: 0})
        }
        else
        {
            if(parseInt(req.body.type)===1)
            {
                const user = new Organisation()
                user.type = 1
                user.name = req.body.name
                user.adminName = req.body.adminName
                user.website=(req.body.website?req.body.website:'')
                user.pass = req.body.pass
                user.followingList=[]
                user.followersList=[]
                user.email=req.body.email
                console.log(user)
                const data=await user.save();
                res.status(200).json({"success":"Successfully registered", status:1})
            }
            else {
                const user=new User()
                user.type = 0
                user.name = req.body.name
                user.dob=Date(req.body.dob);
                user.gender=req.body.gender;
                user.website=(req.body.website?req.body.website:'')
                user.pass = req.body.pass
                user.followingList=[]
                user.followersList=[]
                user.email=req.body.email
                const data=await user.save();
                res.status(200).json({
                    "success":"Successfully registered",
                    status:1
                })
            }
            
        }
    },

    login:async(req,res)=>{
        const {error,isValid}=validateLoginInput(req.body);
        if(!isValid)
        {
        return res.status(400).json({error, status:0});
        }
            if(parseInt(req.body.type)===1) {
                const user = await Organisation.findOne({email:req.body.email})
                if(!user)
                    {
                    return  res.status(400).json({err:"USER NOT FOUND", status : 0})
                    }
                    else
                    {
                    const k=JSON.parse(JSON.stringify(user))
                    let res2=await commonController.compare(req.body.pass,k.pass)
                        if(res2==false)
                        {
                            return res.status(400).json({"error":"Wrong password", status: 0})
                        }
                        else
                        {
                            const payload={id:user._id};
                            const tok=await jwt.sign(payload,secret,{expiresIn:3600})
                            res.json({
                                sucess:true,
                                token:'Bearer '+tok
                            })
                        }
                    } 
            }
            else {
                const user=await User.findOne({email:req.body.email})
                if(!user)
                {
                return  res.status(400).json({err:"USER NOT FOUND", status : 0})
                }
                else
                {
                const k=JSON.parse(JSON.stringify(user))
                let res2=await commonController.compare(req.body.pass,k.pass)
                    if(res2==false)
                    {
                        return res.status(400).json({"error":"Wrong password", status: 0})
                    }
                    else
                    {
                        const payload={id:user._id};
                        const tok=await jwt.sign(payload,secret,{expiresIn:3600})
                        res.json({
                            sucess:true,
                            token:'Bearer '+tok
                        })
                    }
                } 
            }
            
    }

}