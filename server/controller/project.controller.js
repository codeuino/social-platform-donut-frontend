const ProjectModel = require('../schema/project')
const mongoose = require('mongoose')
const user = require('../schema/user')
const org = require('../schema/organisation')
const subscription = require('../schema/subscription')
const webPush = require('web-push')
const _ = require('lodash')
module.exports = {
    addProject : async (req,res) => {  
        try {
           const Project = await ProjectModel.create({
               title:req.body.card_title,
               description:req.body.description,
               content: req.body.card_text,
               Lang:req.body.Lang,
               authorId: req.user.id,
               createdAt : new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear(),
               image : req.body.image // Lets keep it as a string for now ! :)
           })
           // HEre we will notify all followers and followers might be logged in several devices so :)
           let User
           if(req.user.type === 1) {
               // It's an org
                User = await org.findById(req.user.id)
           }else {
               // It's an individual
                User = await user.findById(req.user.id)
           }

           const Followers = User.followersList
           Followers.forEach(async follower => {
               console.log('HI')
               const Follower = await user.findById(follower)
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
    }
}