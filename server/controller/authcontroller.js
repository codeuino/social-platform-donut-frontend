const User=require('../schema/user.js')
const url = require('url');    
const Organisation=require('../schema/organisation.js')
const Social=require('../schema/social.js')
const validateRegisterInput=require('../validation/registervalidation.js')
const validateLoginInput=require('../validation/loginvalidation.js')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret ='mySecret'
const _ =require('lodash')
let clientBaseURL = 'http://localhost:8080/feed/'
module.exports={
    signup:async function (req,res) {
        const {error,isValid}=validateRegisterInput(req.body);
        if(!isValid)
        {
        return res.status(400).json({error,status: 0});
        }
        let socialId
        const us=await User.findOne({email:req.body.email})
        if(us)
        {
            res.status(200).json({"error":"User with this email already exist", status: 0})
        }
        else
        {
            const social = await new Social(req.body.social)
            social.save().then((social)=>{
                socialId = social._id
            })
            if(parseInt(req.body.type)===1)
            {
                const user = new Organisation()
                user.type = 1
                user.name = req.body.name
                user.adminName = req.body.adminName
                user.bio = req.body.bio
                user.website=(req.body.website?req.body.website:'')
                user.pass = req.body.pass
                user.followingList=[]
                user.followersList=[]
                user.email=req.body.email
                user.location = req.body.location
                user.social = socialId
                user.googleId = req.body.googleID
                user.githubId = req.body.githubID
                user.navbarName = req.body.navbarName
                const data=await user.save();
                res.status(200).json({"success":"Successfully registered", status:1,id:data._id})
            }
            else {
                const user=new User()
                user.type = 0
                user.name = req.body.name
                user.dob=Date(req.body.dob);
                user.gender=req.body.gender;
                user.website=(req.body.website?req.body.website:'')
                user.pass = req.body.pass
                user.bio = req.body.bio
                user.followingList=[]
                user.followersList=[]
                user.email=req.body.email
                user.location = req.body.location
                user.social = socialId
                user.googleId = req.body.googleID
                user.githubId = req.body.githubID
                user.navbarName = req.body.navbarName
                const data=await user.save();
                res.status(200).json({
                    "success":"Successfully registered",
                    status:1,
                    id:data._id
                })
            }
            
        }
    },

    login:async function(req,res) {
        const {error,isValid}=validateLoginInput(req.body);
        if(!isValid) return res.status(400).json({error, status:0});        
        if(parseInt(req.body.type)===1) {
                const user = await Organisation.findOne({email:req.body.email})
                if(!user) return  res.status(400).json({err:"USER NOT FOUND", status : 0}) 
                if(user.googleId!=='' || user.githubId!=='') return res.status(400).json({status:0,msg:'Github or Google Account exist, use that!'})                 
                try {
                        var res2 = await bcrypt.compare(req.body.pass,user.pass)
                        if(res2===false) return res.status(400).json({"error":"Wrong password", status: 0})
                } catch (error) {
                        res.status(400).json({message:'Please Write Password',status:0})
                }
                const payload={id:user._id,email:user.email,type:1};
                const tok=await jwt.sign(payload,secret)
                var u = await _.pick(user,['name','_id','type','navbarName'])
                console.log(u)
                res.json({
                        status:1,
                        token:'Bearer  ' + tok,
                        user:u
                })
            }
            else {
                const user=await User.findOne({email:req.body.email})
                if(!user) return  res.status(400).json({err:"USER NOT FOUND", status : 0})
                else {
                    try {
                        var res2 = await bcrypt.compare(req.body.pass,user.pass)
                        console.log(res2)
                        if(res2==false) return res.status(400).json({"error":"Wrong password", status: 0})
                    } catch (error) {
                        res.status(400).json({message:'Please Write Password',status:0})
                    }
                    const payload={id:user._id,email:user.email,type:0};
                    const tok=await jwt.sign(payload,secret)
                    var u = await _.pick(user,['name','_id','type','navbarName'])
                    console.log(u)
                    res.json({
                            status:1,
                            token:'Bearer ' + tok,
                            user:u
                        })
                    
                } 
            }
            
    },
    github : async (req,res) => {
        const data = req.user
        console.log(data)
        if(data._json.type=='User') {
            let user = await User.findOne({email: data._json.email})
            if(user) {
                await User.findByIdAndUpdate(user._id,{
                    $set:{
                        'githubId': data._json.login
                    }
                })
                const payload={id:user._id,email:user.email,type:0};
                const tok=await jwt.sign(payload,secret)
                var u = await _.pick(user,['name','_id','type'])
                
                res.redirect(url.format({
                    pathname:clientBaseURL+u._id,
                    query:{
                        "token":'Bearer  ' +tok,
                        "name": user.name
                    }
                }))
            }else {
                const social = await new Social({github:data._json.html_url})
                social.save().then((social)=>{
                    socialId = social._id
                })
                user = await User.create({
                    type : 0,
                    name:data.displayName,
                    githubId: data._json.login,
                    followingList:[],
                    followersList:[],
                    email:data._json.email,
                    location :{ city:data._json.location}
                })
                const payload={id:user._id,email:user.email,type:0};
                const tok=await jwt.sign(payload,secret)
                var u = await _.pick(user,['name','_id','type'])
                res.redirect(url.format({
                    pathname:clientBaseURL+u._id,
                    query:{
                        "token":'Bearer  ' +tok,
                        "name": user.name
                    }
                }))
            }
        }else {
            let user = await Organisation.findOne({email: data._json.email})
            if(user) {
                await Organisation.findByIdAndUpdate(user._id,{
                    $set:{
                        'githubId': data._json.login
                    }
                })
                const payload={id:user._id,email:user.email,type:1};
                const tok=await jwt.sign(payload,secret)
                var u = await _.pick(user,['name','_id','type'])
                console.log(u._id)
                console.log(clientBaseURL)
                console.log(path.resolve(clientBaseURL,u._id))
                res.redirect(url.format({
                    pathname:clientBaseURL+u._id,
                    query:{
                        "token":'Bearer  ' +tok,
                        "name": user.name
                    }
                }))
            }else {
                const social = await new Social({github:data._json.html_url})
                social.save().then((social)=>{
                    socialId = social._id
                })
                user = await Organisation.create({
                    type : 0,
                    name:data.displayName,
                    adminName: data.username,
                    githubId: data._json.login,
                    followingList:[],
                    followersList:[],
                    email:data._json.email,
                    location :{ city:data._json.location}
                })
                const payload={id:user._id,email:user.email,type:1};
                const tok=await jwt.sign(payload,secret)
                var u = await _.pick(user,['name','_id','type'])       
                res.redirect(url.format({
                    pathname:clientBaseURL+u._id,
                    query:{
                        "token":'Bearer  ' +tok,
                        "name": user.name
                    }
                }))
            }
        }
    }

}
