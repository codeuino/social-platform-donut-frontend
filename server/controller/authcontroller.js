const User=require('../schema/user.js')
const Organisation=require('../schema/organisation.js')
const Social=require('../schema/social.js')
const validateRegisterInput=require('../validation/registervalidation.js')
const validateLoginInput=require('../validation/loginvalidation.js')
const jwt=require('jsonwebtoken')
const commonController = require('../controller/commoncontroller')
const {secret} = require('../config/credential')
const _ =require('lodash')
module.exports={
    signup:async(req,res)=>{
        const {error,isValid}=validateRegisterInput(req.body.form);
        if(!isValid)
        {
        return res.status(400).json({error,status: 0});
        }
        let socialId
        const us=await User.findOne({email:req.body.form.email})
        
        console.log(us)
        if(us)
        {
            res.status(200).json({"error":"User with this email already exist", status: 0})
        }
        else
        {
            const social = await new Social(req.body.form.social)
            social.save().then((social)=>{
                socialId = social._id
            })
            if(parseInt(req.body.form.type)===1)
            {
                const user = new Organisation()
                user.type = 1
                user.name = req.body.form.name
                user.adminName = req.body.form.adminName
                user.website=(req.body.form.website?req.body.form.website:'')
                user.pass = req.body.form.password
                user.followingList=[]
                user.followersList=[]
                user.email=req.body.form.email
                user.location = req.body.form.location
                user.social = socialId
                console.log(user)
                const data=await user.save();
                res.status(200).json({"success":"Successfully registered", status:1})
            }
            else {
                const user=new User()
                user.type = 0
                user.name = req.body.form.name
                user.dob=Date(req.body.form.dob);
                user.gender=req.body.form.gender;
                user.website=(req.body.form.website?req.body.form.website:'')
                user.pass = req.body.form.password
                user.followingList=[]
                user.followersList=[]
                user.email=req.body.form.email
                user.location = req.body.form.location
                user.social = socialId
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
                            var u = await _.pick(user,['name','_id','type'])
                            res.json({
                                sucess:true,
                                token:'Bearer '+tok,
                                user:u
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
                        var u = await _.pick(user,['name','_id','type'])
                        res.json({
                            sucess:true,
                            token:'Bearer '+tok,
                            user:u
                        })
                    }
                } 
            }
            
    }

}