const express = require('express');
const route = express.Router();
const bodyparser = require('body-parser');
const url = bodyparser.urlencoded({ extended: false });
const profileController = require('../controller/profile.controller');
const jsonParser = bodyparser.json();

const passport=require('passport');
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

route.get('/search', url, jsonParser, profileController.search);

route.post('/check', url, jsonParser, profileController.check);

route.get('/profile/:id',passport.authenticate('jwt',{session:false}), profileController.profileId);

route.get('/profileview/:sd',passport.authenticate('jwt',{session:false}), url, profileController.profileViewSd);

route.post('/publish', passport.authenticate('jwt',{session:false}),url,upload.single('image'), profileController.publish);

route.get('/ch2',passport.authenticate('jwt',{session:false}),profileController.ch2);

route.get('/dashBoard', url, profileController.dashBoard);

route.get('/setting', url, profileController.setting);

route.get('/getDetails', url, profileController.getDetails);

route.post('/updateDetails', jsonParser, profileController.updateDetails);

module.exports = route;
