const ProjectModel = require('../schema/project')
const mongoose = require('mongoose')
const user = require('../schema/user')
const org = require('../schema/organisation')
const subscription = require('../schema/subscription')
const webPush = require('web-push')
const _ = require('lodash')
module.exports = {
    addProject : async (req,res) => {
        console.log(req.body)
        // We need name of author so
        let authorName
        try {
            if(req.user.type===1){
                const User = await org.findById(req.user.id)
                authorName = User.name
            }else {
                const User = await user.findById(req.user.id)
                authorName = User.name
            }
        } catch (error) {
            console.log(error)
            return res.json({
                status:0
            })
        }
        

        try {
           let Project = await ProjectModel.create({
               pname:req.body.card_title,
               github:req.body.github,
               description:req.body.description,
               content: req.body.card_text,
               Lang:req.body.Lang,
               authorId: req.user.id,
               authorName : authorName,
               createdAt : new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear(),
               image : req.body.image // Lets keep it as a string for now ! :)
           })
           // HEre we will notify all followers and followers might be logged in several devices so :)
           let User
           if(req.user.type === 1) {
               // It's an org
                User = await org.findById(req.user.id)
                await org.findByIdAndUpdate(req.user.id,{
                    $push:{
                        'Projects':Project._id
                    }
                })

           }else {
               // It's an individual
                User = await user.findById(req.user.id)
                await user.findByIdAndUpdate(req.user.id,{
                    $push:{
                        'Projects':Project._id
                    }
                })
           }

           const Followers = User.followersList
           Followers.forEach(async follower => {
               console.log('HI')
               let Follower
               if(follower.type===1) {
                Follower = await org.findById(follower.id)
               }else {
                Follower = await user.findById(follower.id)
               }
               console.log(Follower)
               const devices = Follower.devices
               devices.forEach(device => {
                   subscription.findById(device)
                   .then(sub => {
                    
                    const payload = JSON.stringify({
                        notification: {
                          'title': 'Push notifications with Service Workers'
                        }
                      })
                    const Sub ={ 
                        endpoint: sub.endpoint,
                       keys: sub.keys
                        }   
                    webPush.sendNotification(Sub,payload)
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
                   })
                   
                   
               })
           });

           res.json({Project,status:1})
        } catch (err) {
            res.status(400).json({err,status:0})
        }
    },
    fetchProjects : async function (req,res) {
    const projects = await ProjectModel.find({})
    res.json({
        status:1,
        projects:projects
    })
    },
    fetchProject : async function (req,res) {
        const project = await ProjectModel.findById(req.body.id)
        res.json({
            status:1,
            project:project
        })
    },
    addComment : async function(req,res) {
        let User
        if(req.user.type===1) {
            User = await org.findById(req.user.id)
        }else {
            User = await user.findById(req.user.id)
        }
        const comment = {
            author: User.name,
            author_id: req.user.id,
            comment: req.body.comment,
            uuid:req.body.uuid
        }
        try {
            await ProjectModel.findByIdAndUpdate(req.body.id,{
                $push : {
                    'comments': comment
                }
            })
            res.json({
                status:1,
            })
        } catch (error) {
            console.log(error)
            res.json({
                status:0
            })
        }
        
    },
    upVoteDownVote : async function(req,res) {
        console.log(req.body.vote)
        if(req.body.vote== 1 || req.body.vote== -1 || req.body.vote == 0) {
            try {
                const Project = await ProjectModel.findById(req.body.id)
                Project.upDownVote.set(req.user.id,req.body.vote)
                Project.save()
                res.json({
                    status:1,
                    vote:req.body.vote
                })
            } catch (error) {
                console.log(error)
                res.json({
                    status:0
                })
            }
        }else {
             return res.json({
                status:0,
                msg:'Use only 1 for upvote and -1 for downvote '
            })
        }
        
        
    }
}
