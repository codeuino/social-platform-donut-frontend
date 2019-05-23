const user = require('../schema/user.js');
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
  SubmitprojectForm:function(req,res){
    res.render('projectForm')
  },
  search: function(req, res) {
    console.log(req.body);
  },
  check: function(req, res) {
    console.log(req.body);
  },
  profileId: function(req, res) {
    user
      .findOne({ Eid: req.user.Eid })
      .lean()
      .then(function(us) {
        req.params.id = us.Eid;
        res.redirect('/profile/profileview/' + req.params.id);
      });
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
      console.log(req.user);
      user.findOne({ Eid: req.params.sd }).then(function (use) {
        console.log(da)
          res.render('other-landing', { use: use, ques: da, sign: req.user});
      })
    })
  },
  publish: function(req, res) {
    var lan=req.body.genre.split(',');
    req.check('contentname','Project name is required !!').notEmpty();
    req.check('git','Github url is required !!').isURL();
    req.check('cont','Description is required !!').notEmpty();
    req.check('genre','Language used is required !!').notEmpty();
    req.getValidationResult(req)
      .then((result)=>{
        if(result.isEmpty() === false){
          result.array().forEach((error)=>{
            console.log(error.msg);
            res.redirect('/profile/submitProject');
          });
        } else {
          new proj({
            createdAt:Date.now(),
            pname: req.body.contentname,
            pid: req.user.Eid,
            github: req.body.git,
            Lang:lan,
            content: req.body.cont,
            upvote: '',
            downvote: '',
            proid: Math.floor(Math.random() * 100000),
            image:'/images/uploads/'+req.file.filename
          })
            .save()
            .then(function() {
              res.redirect('/profile/profileview/' + req.user.Eid);
            });
        }
       })
       .catch((err)=>{
         console.log(`${err}`);
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
    res.render('main-landing', { sign: req.user });
  },
  up: function(req, res) {
    res.send('success');
  },
  dashBoard: function(req, res) {
    res.render('dashboard', { user: req.user });
  },
  setting: function(req, res) {
    res.render('setting', { user: req.user });
  },
  updateDetails: function(req, res) {
    user.findOne({ Eid: req.user.Eid }).then(function(data) {
      // prettier-ignore
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
            console.log(error.msg);
            res.redirect('/profile/setting');
          });
        } 
      })
      .catch((err)=>{
        console.log(`${err}`);
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
              console.log('profile updated !');
              // res.send('success');
            })
            .catch((err)=>{
              console.log(`${err}`);
            });
    });
  },
  getDetails: function(req, res) {
    user
      .findOne({ Eid: req.user.Eid })
      .lean()
      .then(function(data) {
        res.send(data);
      });
  }
};
