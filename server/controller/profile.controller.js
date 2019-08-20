// status 1 : FOR SUCCESS
// status 0 :FOR FAIL

const Subscription = require('../schema/subscription')
const user = require('../schema/user.js');
const _ = require('lodash')
const OrganisationModel = require('../schema/organisation')
const proj = require('../schema/project.js');
// var multer = require('multer');
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// var upload = multer({storage: storage});
module.exports = {
  addDevice: async function(req,res) {
      const subscription = req.body 
      // Here it goes subscription obj
      // We'll check whether subscription exists or not
      Subscription.findOne({endpoint:subscription.endpoint})
      .then(sub => {
          if(sub) {
            res.json({
              status:1,
              msg:'Success'
            })
          }else {
            // Now we have to create new subscription :)
            Subscription.create(subscription)
            .then(sub => {
              console.log(sub)
              // We have to add device id to user
              if(req.user.type == 1) {
                OrganisationModel.findByIdAndUpdate(req.user.id,{
                  $push:{
                    'devices' : sub._id,
                  }
                }).then(
                  user=> {
                    console.log(user)
                    res.json({ status:1, msg:'Success'})
                  })
                .catch(err => {
                  console.log(err)
                  res.status(400).json({
                    status:0,
                    msg: 'Fail'
                  })
                }) 
              }else {
                // type == individual
                user.findByIdAndUpdate(req.user.id,{
                  $push:{
                    'devices' : sub._id,
                  }
                }).then(
                  user=> {
                    console.log(user)
                    res.json({ status:1, msg:'Success'})
                  })
                .catch(err => {
                  console.log(err)
                  res.status(400).json({ status:0, msg: 'Fail'})
                }) 
              }
              
            })
            
          }
        })
      .catch (err => {
        console.log(err)
        res.status(400).json({ status:0, msg: 'Fail' })
      })
  },
  follow: async function(req,res) {
    let returnFLag
    const SubscribingTo = req.body.user.id // User who's getting a follower
    const SubscribingBy = req.user.id // User who will subscribe
    let tempUser
    let tempOrg
    // Check if both users are same 
    if(SubscribingBy===SubscribingTo) {
      return res.json({ status:0, msg: "You can't follow yourself" })
    }
    // Now We Must check whether subscribingto is already in the listl, if YES we'll send failure response
    // First Let's update subscribing user 
    if(req.user.type === 1 ){

      tempOrg = await OrganisationModel.findById(SubscribingBy)
      
      tempOrg.followingList.forEach(user => {
        if(user.id == SubscribingTo) {
          returnFLag = true
          return res.send({status:1, msg:'User Already Follows'})
        }
      })
      if(returnFLag) return 
      try {
        await OrganisationModel.findByIdAndUpdate(SubscribingBy,{ $push: {'followingList' : {id:SubscribingTo,type:req.body.user.type}}})
      } catch(err) {
        return res.json({status:0, msg:'Some Error Occured'})
      }
    }else {
      tempUser = await user.findById(SubscribingBy)
      console.log(tempUser)
      
      tempUser.followingList.forEach(user => {
        if(user.id == SubscribingTo) {
          returnFLag = true
          return res.send({status:1, msg:'User Already Follows'})
        }
      })
      if(returnFLag) return
      try {
        await user.findByIdAndUpdate(SubscribingBy,{$push: {'followingList' :{id:SubscribingTo,type:req.body.user.type} }})
      }
      catch(err) {
        console.log(err)
        return res.status(400).json({ status:0,msg:'Some Error Occured'})
      }
    } 
    console.log('Subscribing User UPDATED')
    // Now Le'ts update the subscribed user
    // NOTE: MAKE THIS ASYNC/AWAIT
    if(req.body.user.type === 1 ){
      const User = await OrganisationModel.findById(SubscribingTo)
      try {
        await OrganisationModel.findByIdAndUpdate(SubscribingTo,{$push: {'followersList' : { id:SubscribingBy, type:req.user.type}}})
        return res.json({ status:1, msg:'Success'})
      }catch (err) {
        console.log(err)
        return res.status(400).json({ status:0, msg:'Some Error Occured'})
      }
    }else {
      const User = await user.findById(SubscribingTo)
      try {
        await user.findByIdAndUpdate(SubscribingTo,{$push: {'followersList' : { id:SubscribingBy,type:req.user.type}}})
        console.log('Subscribed User Updated')
        return res.json({ status:1, msg:'Success' })
      }catch (err) {
        console.log(err)
        return res.status(400).send({
          status:0,
          msg:'Some Error Occured'
      })
    } 
    //END
  }
},
  profileId: function(req, res) {
    if(req.user.id==req.params.id)
    {
      user
        .findOne({Eid:req.user.Eid })
        .lean()
        .then(function(us) {
          req.params.id = us.Eid;
          proj.find().then((proj)=>{
            res.json({proje:proj,user:req.user});
          })
        });
    }
    else
    {
    proj.findOne({pid:req.params.id}).then((proj)=>{
      res.json({proje:proj,user:req.params.id})
    })
    }
  },
  profileViewSd: function(req, res) {
    proj.aggregate([
      {
        $lookup:{
          from:'users',
          localField:'pid',
          foreignField:'Eid',
          as:'result'
        }
      }
    ]).sort({createdAt:-1}).then((da)=>{
      user.findOne({ Eid: req.params.sd }).then(function (use) {
          console.log(da)
          res.send({use: use,ques:da,sign:req.user});
      })
    })
  },
  publish: function(req, res) {
    req.check('contentname','Project name is required !!').notEmpty();
    req.check('git','Github url is required !!').isURL();
    req.check('cont','Description is required !!').notEmpty();
    req.check('genre','Language used is required !!').notEmpty();
    new proj({
            createdAt:Date.now(),
            pname: req.body.contentname,
            pid: req.user.Eid,
            github: req.body.git,
            Lang:req.body.lan,
            content: req.body.cont,
            upDownVote : {},
            proid: Math.floor(Math.random() * 100000),
      })
            .save()
            .then((e)=>{
              res.send(e).status(200);
       });
},
  ch2: function(req, res) {
    res.json({ sign: req.user }); // Main LANDING PAGE , NEW COMMENT => Landing page should be only for organisation which will return portfolio of the org
  },
  dashBoard: function(req, res) {
    res.json({ user: req.user }); // DASHBOARD
  },
  setting: function(req, res) {
    res.json({ user: req.user }); //SETTING
  },
  updateDetails: function(req, res) {
    user.findOne({ Eid: req.user.Eid }).then(function(data) {
      req.check('fname','First name is required !').notEmpty();
      req.check('lname','Last name is required !').notEmpty();
      req.check('bio','Bio is required !').notEmpty();
      req.check('college','College name is required !').notEmpty();
      req.check('email','Email is required !').isEmail();
      req.check('githubUrl','Github url is required !').isURL();
      req.check('linkedinUrl','Linkedin url is required !').isURL();
      req.check('facebookUrl','Facebook url is required !').isURL();
      req.check('city','City name is required !').notEmpty();
      req.check('country','Country name is required !').notEmpty();
      req.check('languages','Language is required !').notEmpty();
      req.getValidationResult(req)
      .then((result)=>{
        if(result.isEmpty() === true){
          result.array().forEach((error)=>{
            res.status(400).json({
              error
            })
          });
        }
      })
      .catch((err)=>{
        res.status(400).send(error)
      });
          (data.fname = req.body.fname),
          (data.lname = req.body.lname),
          (data.bio = req.body.bio),
          (data.college = req.body.college),
          (data.email = req.body.email),
          (data.github = req.body.githubUrl),
          (data.linkedin = req.body.linkedinUrl),
          (data.city = req.body.city),
          (data.country = req.body.country),
          (data.lang = req.body.languages),
          (data.facebook = req.body.facebookUrl);
          data.save()
            .then(()=>{
              res.json({
                msg:"Success",
                status:1
              })
              // res.send('success');
            })
            .catch((err)=>{
              res.status(400).json({
                msg:"FAILURE",
                status:0
              })
            });
    });
  },
  getDetails: async function(req, res) {
    if(req.user.type === 0) {
      try {
        const User = await user.findById(req.user.id)
        console.log(User)
        if(User) {
          var temp = _.pick(User,["_id","githubId",'name'])
        res.json({
          status:1,
          user:temp
        })
        }else {
          res.status(400).json({
            status:0,
            msg:"User doesn't exist"
          })
        }
      } catch(err) {
        res.status(400).json({
          status:0,
          msg:'Error'
        })
      }
    }else {
      try {
        const User = await OrganisationModel.findById(req.user.id)
        if(User) {
          var temp = _.pick(User,["_id","githubId",'name'])
        res.json({
          status:1,
          user:temp
        })
        }else {
          res.status(400).json({
            status:0,
            msg:"User doesn't exist"
          })
        }
        
      } catch(err) {
        res.status(400).json({
          status:0,
          msg:'Error'
        })
      }
    }
  },
  getProfile: async function ( req, res) {
    try {
      if(req.user.type === 1) {
        let User = await OrganisationModel.findById(req.user.id).populate('Projects')
        var temp = await _.pick(User,['name', 'profilePic', 'followersList','followingList', 'bio', 'location','social','Projects'])
        res.status(200).json({
          user:temp
        })
      }else {
        let User = await user.findById(req.user.id).populate('Projects')
        var temp = await _.pick(User,['name', 'profilePic', 'followersList','followingList', 'bio', 'location','social','Projects'])
        res.status(200).json({
          user:temp
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({
        msg:'Failed to retreive user details'
      })
    }
  }
};
