const user = require('../schema/user.js');
const proj = require('../schema/project.js');

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
          res.render('other-landing', { use: use, ques: da, sign: req.user});
      })
    })
  },
  publish: function(req, res) {
      var lan=req.body.genre.split(',');
    new proj({
      createdAt:Date.now(),
      pname: req.body.contentname,
      pid: req.user.Eid,
      github: req.body.git,
      Lang:lan,
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
  upvote: function(req, res) {
    var p = 0;

    var check = 0;
    var comment = ' ';
    for (var q = 0; q < proj.downvote.length; q++) {
      if (req.body.client == proj.downvote[q]) {
        comment = 'Cannot upvote and downvote a post ';
        check = 1;
        break;
      }
    }

    if (check == 1) {
      res.send({ proj, comment });
    } else {
      for (var v = 0; v < proj.upvote.length; v++) {
        if (req.body.client == proj.upvote[v]) {
          p = 1;
          proj.upvote.pop(req.body.client);
          proj.save();
          console.log('already present');
          break;
        }
      }

      if (p == 0) {
        proj.upvote.push(req.body.client);
        proj.save();
      }

      res.send({ comment, proj });
    }
  },
  downvote: function(req, res) {
    proj.findOne({ proid: req.body.project }).then(function(proj) {
      var p = 0;
      var check = 0;
      var comment = '';

      for (var q = 0; q < proj.upvote.length; q++) {
        if (req.body.client == proj.upvote[q]) {
          comment = 'Cannot do upvote downvote at same post';
          check = 1;
          break;
        }
      }

      if (check == 1) {
        res.send({ comment, proj });
      } else {
        for (var v = 0; v < proj.downvote.length; v++) {
          if (req.body.client == proj.downvote[v]) {
            p = 1;
            proj.downvote.pop(req.body.client);
            proj.save();
            console.log('already present');
            break;
          }
        }

        if (p == 0) {
          proj.downvote.push(req.body.client);
          proj.save();
        }

        res.send({ comment, proj });
      }
    });
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
