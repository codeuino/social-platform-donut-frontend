const Event = require('../schema/events')
const Organisation = require('../schema/organisation')
const User = require('../schema/user')
const _ = require('lodash')
module.exports ={ 
    addEvent : async function(req,res) {
        //Note : We have to have validate date, they should be of future XD
        console.log(req.body)
        console.log(req.file)
        const Venue = {
            location: req.body.location,
            time: req.body.time,
            date:req.body.date
        }
        let user
        if(req.user.type === 1) {
            user = await Organisation.findById(req.user.id)   
        }else {
            user = await User.findById(req.user.id)
        }
        let organiserDetails = {
            phone:req.body.phone,
            email:req.body.email,
            Type: req.user.type,
            id:req.user.id,
            name: user.name
        }
        
        //Add image to mongoose and save filename in events collection
        let event

        try {
            event = await Event.create({
                members:[req.user.id],
                title: req.body.title,
                venue: Venue,
                organiser : req.user.id,
                description: req.body.description,
                organiserDetails : organiserDetails,
                attendees:[req.user.id],
                //NEed to add gridfs to upload image
                coverImg : ''
            })
            console.log(event)
        } catch(err) {
            console.log(err)
            res.status(400).json({
                status:0,
                msg:'Failed to add event'
            })
        }
        console.log(event)
        if(req.user.type ===1) {
            try {
                const  user = await Organisation.findByIdAndUpdate(req.user.id,{
                    $push : {
                        'Events': event
                    }
                })
                res.json({
                    status:1,
                    msg:'Success',
                    event:event._id
                })
            } catch (err) {
                console.log(err)
                res.status(400).json({
                    status:0,
                    msg:'Failed to add event'
                })
            }     
        } else {
            try {
                const  user = await User.findByIdAndUpdate(req.user.id,{
                    $push : {
                        'Events': event._id
                    }
                })
                res.json({
                    status:1,
                    msg:'Success',
                    event:event
                })
            } catch (err) {
                console.log(err)
                res.status(400).json({
                    status:0,
                    msg:'Failed to add event'
                })
            }
        }
    },
    addMembers: async function(req,res) {
        const members = await JSON.parse(req.body.members)
        console.log(members)
        if (req.body.type === 1) {
            try {
                const user = await Organisation.findById(req.user.id)
                if(user.Events.indexOf(req.body.id) !== -1) {
                    const event = await Event.findByIdAndUpdate(req.body.id, {
                        $push : {
                            'members' : [...members]
                        }
                    })
                res.json({
                        status:1,
                        msg:'Members are added'
                    })
                }else {
                    res.status(401).json({
                        status:0,
                        msg:'Authentication Error'
                    })
                }
            }catch (err) {
                console.log(err)
                res.status(400).json({
                    status:0,
                    msg:'Failed to update event'
                })
            }
        } else {
            try {
                const user = await User.findById(req.user.id)
                if(user.Events.indexOf(req.body.id) !== -1) {
                    const event = await Event.findByIdAndUpdate(req.body.id, {
                        $push : {
                            'members' : [...members]
                        }
                    })
                res.json({
                        status:1,
                        msg:'Members are added'
                    })
                }else {
                    res.status(401).json({
                        status:0,
                        msg:'Authentication Error'
                    })
                }
            }catch (err) {
                console.log(err)
                res.status(400).json({
                    status:0,
                    msg:'Failed to update event'
                })
            }
        }
    },
    updateEvent : async function(req,res) {
        if(!req.body.coverImg) {
            const event = await Event.findById(req.body.id)
            req.body.coverImg = event.coverImg
        }
        let newVenue = {
            location: req.body.location,
            time : req.body.time
        }
        if (req.body.type === 1) {
            
            try {
                const user = await Organisation.findById(req.user.id)
                if(user.Events.indexOf(req.body.id) !== -1) {
                
                    const event = await Event.findByIdAndUpdate(req.body.id, {
                        $set : {
                            title:req.body.title,
                            venue: newVenue,
                            description : req.body.description,
                            coverImg : req.body.coverImg
                        }
                    })
                res.json({
                        status:1,
                        msg:'Event Updated'
                    })
                }else {
                    res.status(401).json({
                        status:0,
                        msg:'Authentication Error'
                    })
                }
            }catch (err) {
                console.log(err)
                res.status(400).json({
                    status:0,
                    msg:'Failed to update event'
                })
            }
        } else {
            try {
                const user = await User.findById(req.user.id)
                if(user.Events.indexOf(req.body.id) !== -1) {
                    const event = await Event.findByIdAndUpdate(req.body.id, {
                        $set : {
                            title:req.body.title,
                            venue: newVenue,
                            description : req.body.description,
                            coverImg : req.body.coverImg
                        }
                    })
                res.json({
                        msg:'Event Updated'
                    })
                }else {
                    res.status(401).json({
                        msg:'Authentication Error'
                    })
                }
            }catch (err) {
                console.log(err)
                res.status(400).json({
                    msg:'Failed to update event'
                })
            }
        }
    },
    changeStatus:  async function (req,res) {
        if(req.body.status>3 || req.body.status <0) {
            return res.status(400).json({
                msg:'Invalid Status'
            })
        }
        
        if (req.body.type === 1) {
            
            try {
                const user = await Organisation.findById(req.user.id)
                if(user.Events.indexOf(req.body.id) !== -1) {
                    const event = await Event.findByIdAndUpdate(req.body.id, {
                        $set : {
                            status:req.body.status
                        }
                    })
                res.json({
                        msg:'Event Updated'
                    })
                }else {
                    res.status(401).json({
                        msg:'Authentication Error'
                    })
                }
            }catch (err) {
                console.log(err)
                res.status(400).json({
                    msg:'Failed to update event'
                })
            }
        } else {
            try {
                const user = await User.findById(req.user.id)
                if(user.Events.indexOf(req.body.id) !== -1) {
                    const event = await Event.findByIdAndUpdate(req.body.id, {
                        $set : {
                            status:req.body.status
                        }
                    })
                res.json({
                        status:1,
                        msg:'Event Updated'
                    })
                }else {
                    res.status(401).json({
                        status:0,
                        msg:'Authentication Error'
                    })
                }
            }catch (err) {
                console.log(err)
                res.status(400).json({
                    status:0,
                    msg:'Failed to update event'
                })
            }
        }
    },
    fetchEvent :async function( req,res) {
        const event = await Event.findById(req.body.id)
        if(!event) {
            res.status(400).json({
                msg: "Event doesn't exist"
            })
        }else {
            res.status(200).json({
                event
            })
        }
         
    },
    fetchEvents : async function(req,res) {
        try {
            var events = await Event.find({}).sort({createdAt:-1})
        res.json({
            status:1,
            events:events
        })
        }catch(err) {
            console.log(err)
            res.json({
                status:0,
                msg:'Unable To Fetch Events'
            })
        }
        
    },
    attendEvent : async function(req,res) {
        try {
            await Event.findByIdAndUpdate(req.body.id,{
                $push:{
                    'attendees':req.user.id
                }
            })
            res.json({
                status:1
            })
        }catch(err) {
            res.status(400).json({
                status:0,
                msg:'Unable to add attendee'
            })
        }
        
    }
}            
