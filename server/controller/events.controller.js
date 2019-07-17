const Event = require('../schema/events')
const Organisation = require('../schema/organisation')
const User = require('../schema/user')
const _ = require('lodash')
module.exports ={ 
    addEvent : async function(req,res) {
        //Note : We have to have validate date, they should be of future XD
        console.log(req.body)
        const Venue = {
            location: req.body.location,
            time: req.body.time
        }
        const organiserDetails = await JSON.parse(req.body.organiserDetails)   
        let event
        try {
            event = await Event.create({
                members:[req.user.id],
                title: req.body.title,
                venue: Venue,
                organiser : req.user.id,
                description: req.body.description,
                organiserDetails : organiserDetails,
                coverImg : req.body.coverImg
            })
        } catch(err) {
            console.log(err)
            res.status(400).json({
                status:0,
                msg:'Failed to add event'
            })
        }
        
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
                    event:event
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
                        'Events': event
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
    changeStatus:  async function (req,res) {
        if(req.body.status>3 || req.body.status <0) {
            return res.status(400).json({
                status:0,
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
                        status:1,
                        msg:'WEvent Updated'
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
        Event.findById(req.body.id)
        .populate('organiser attendees members')
        .exec((err,doc)=>{
            if(err) return res.status(400).json({status:0,msg:'Failed to fetch event'})
            const eventDetails = _.pick(doc,['venue','status','_id','title','organiser.name','description','organiserDetails','members','attendees'])
            res.json({
                status:1,
                event:eventDetails
            })
        }) 
    },
    fetchEvents : async function(req,res) {
            let Events=[]
            Event.find()
            .populate('organiser')
            .exec((err,doc) => {
                if (err) return res.status(400).json({status:0,msg:'Failed to fetch event'})       
                doc.forEach(event => {
                    var temp = _.pick(event,['venue','status', '._id','title','organiser.name','description','organiserDetails'])
                    Events.push(temp)
                } )
                res.json({
                    status:1,
                    events:Events
                })
            })      
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
