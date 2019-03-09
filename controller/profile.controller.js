const user = require('../schema/user.js');
const proj = require('../schema/project.js');

module.exports = {
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
    proj
      .find({ pid: req.params.sd })
      .lean()
      .then(function(ques) {
        user
          .findOne({ Eid: req.params.sd })
          .lean()
          .then(function(use) {
            res.render('other-landing', {
              use: use,
              ques: ques,
              sign: req.user
            });
          });
      });
  },
  publish: function(req, res) {
    new proj({
      pname: req.body.contentname,
      pid: req.user.Eid,
      github: req.body.git,
      Lang: req.body.genre,
      content: req.body.cont,
      upvote: '',
      downvote: '',
      proid: Math.floor(Math.random() * 100000)
    })
      .save()
      .then(function() {
        res.redirect('/profile/profileview/' + req.user.Eid);
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
      data.save();
      res.send('success');
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
