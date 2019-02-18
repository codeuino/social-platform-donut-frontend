var express = require('express');
var router = express.Router();
var profileRoutes = require('./profile.routes');
var loginRoutes = require('./login.routes');

  router.get('/',function(req,res){


    if(req.user==null)
    {
      res.render('all');
    }
    else
    {
      res.redirect('/profile/profile/'+req.user.Eid);
    }
    })


router.use('/profile',profileRoutes);
router.use('/auth',loginRoutes);


module.exports = router;
