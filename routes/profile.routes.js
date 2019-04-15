const express = require('express');
const route = express.Router();
const bodyparser = require('body-parser');
const url = bodyparser.urlencoded({ extended: false });
const user = require('../schema/user.js');
const proj = require('../schema/project.js');
const profileController = require('../controller/profile.controller');
const jsonParser = bodyparser.json();
const auth = function(req, res, next) {
  if (req.user == null) {
    res.redirect('/');
  } else {
    next();
  }
};
var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'views/images/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({storage: storage});
route.get('/submitProject',auth,profileController.SubmitprojectForm)
route.get('/search', url, jsonParser, profileController.search);

route.post('/check', url, jsonParser, profileController.check);

route.get('/profile/:id', auth, profileController.profileId);

route.get('/profileview/:sd', auth, url, profileController.profileViewSd);

route.post('/publish', auth, url,upload.single('image'), profileController.publish);

route.post('/upDownVote', auth,url, jsonParser,profileController.upDownVote);



route.get('/ch2', auth, profileController.ch2);

route.get('/up', auth, profileController.up);
route.get('/dashBoard', auth, url, profileController.dashBoard);
route.get('/setting', auth, url, profileController.setting);
route.get('/getDetails', auth, url, profileController.getDetails);
route.post('/updateDetails', auth, jsonParser, profileController.updateDetails);
module.exports = route;
