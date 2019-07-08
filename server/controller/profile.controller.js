// status 1 : FOR SUCCESS
// status 0 :FOR FAIL

const Subscription = require('../schema/subscription')
const user = require('../schema/user.js');
const OrganisationModel = require('../schema/organisation')
const proj = require('../schema/project.js');
const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
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
      const subscription = req.body // Here it goes subscription obj
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
              if(req.user.type == 1) {
                OrganisationModel.findByIdAndUpdate(req.user.id,{
                  $push:{
                    'devices' : sub._id,
                  }
                }).then(
                  user=> {
                    console.log(user)
                    res.json({
                      status:1,
                      msg:'Success'
                    })
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
                    res.json({
                      status:1,
                      msg:'Success'
                    })
                  })
                .catch(err => {
                  console.log(err)
                  res.status(400).json({
                    status:0,
                    msg: 'Fail'
                  })
                }) 
              }
              
            })
            
          }
        })
      .catch (err => {
        console.log(err)
        res.status(400).json({
          status:0,
          msg: 'Fail'
        })
      })
       
      
  },
  follow: async function(req,res) {
    const SubscribingTo = req.body.user.id // User who's getting a follower
    const SubscribingBy = req.user.id // User who will subscribe
    let tempUser
    let tempOrg
    // Check if both users are same 
    if(SubscribingBy===SubscribingTo) {
      return res.json({
        status:0,
        msg: "You can't follow yourself"
      })
    }
    // Now We Must check whether subscribingto is already in the listl, if YES we'll send failure response
    // First Let's update subscribing user 
    if(req.user.type === 1 ){

      tempOrg = await OrganisationModel.findById(SubscribingBy)
      if(tempOrg.followingList.indexOf(SubscribingTo.toString()) !== -1) {
        return res.send({status:1,msg:'User Already Follows'})
      }
      try {
        await OrganisationModel.findByIdAndUpdate(SubscribingBy,{ $push: {'followingList' : SubscribingTo}})
      } catch(err) {
        return res.json({status:0, msg:'Some Error Occured'})
      }
    }else {
      tempUser = await user.findById(SubscribingBy)
      console.log(tempUser)
      if(tempUser.followingList.indexOf(SubscribingTo) !==-1 ) {
        return res.send({status:1, msg:'User Already Follows'})
      }
      try {
        await user.findByIdAndUpdate(SubscribingBy,{$push: {'followingList' : SubscribingTo }})
      }
      catch(err) {
        console.log(err)
        return res.send({status:0,msg:'Some Error Occured'})
      }
    } 
    console.log('Subscribing User UPDATED')
    // Now Le'ts update the subscribed user
    // NOTE: MAKE THIS ASYNC/AWAIT
    if(req.body.user.type === 1 ){
      OrganisationModel.findById(SubscribingTo).then(User => {
        if(User.followersList.indexOf(SubscribingBy.toString()) !== -1 ) {
          return res.send({status:1,msg:'User Already Follows'})
        }
      })
      
      OrganisationModel.findByIdAndUpdate(SubscribingTo,{$push: {'followersList' : SubscribingBy}})
      .then(()=> {
        return res.send({status:1, msg:'Success'})
      })
      .catch (err => {
        console.log(err)
        return res.send({status:0,msg:'Some Error Occured'})
      })
    }else {
      user.findById(SubscribingTo).then(User => {
        if(User.followersList.indexOf(SubscribingBy.toString()) !== -1 ) {
          return res.send({
            status:1,
            msg:'User Already Follows'
          })
        }
      })
      user.findByIdAndUpdate(SubscribingTo,{
        $push: {
          'followersList' : SubscribingBy
        }
      })
      .then(()=> {
        return res.send({
          status:1,
          msg:'Success'
        })
      })
      .catch (err => {
        console.log(err)
        return res.send({
          status:0,
          msg:'Some Error Occured'
        })
      })
    } 
    console.log('Subscribed User Updated')
    //END
  },
  search: function(req, res) {
    console.log(req.body); // So here we need to fetch data from query instead of body, and then need to return array of result :)
  },
  check: function(req, res) {
    console.log(req.body); // I have no idea abou this function!
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
          res.send({ use: use, ques: da, sign: req.user});
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
  upDownVote: function (req,res) {
    proj.findOne({proid: req.body.project}).then((pro)=>{
      if(pro.upDownVote.get(req.body.client)){
          if(pro.upDownVote.get(req.body.client)=="-1"){
              pro.upDownVote.set(req.body.client,"+1")
              return pro.save()

          }else{
              pro.upDownVote.set(req.body.client,"-1")
              return pro.save()

          }
      }else{
          pro.upDownVote.set(req.body.client,req.body.vote)
          return pro.save()
      }
  }).catch((err)=>{
      return err
    })
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
            res.status(400).send(error)
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
              res.json({
                msg:"FAIURE",
                status:0
              })
            });
    });
  },
  getDetails: function(req, res) {
    user
      .findOne({ Eid: req.user.Eid })
      .lean()
      .then(function(data) {
        res.json({
          status:1,
          data
        });
      });
  }
};
