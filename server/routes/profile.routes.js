const express = require('express');
const route = express.Router();
const bodyparser = require('body-parser');
const profileController = require('../controller/profile.controller');
const passport = require('passport');
// var multer = require('multer');
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'views/images/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// var upload = multer({storage: storage});

// route.get('/search', url, jsonParser, profileController.search);

// route.post('/check', url, jsonParser, profileController.check);

// route.get('/profile/:id',passport.authenticate('jwt',{session:false}), profileController.profileId);

// route.get('/profileview/:sd',passport.authenticate('jwt',{session:false}), url, profileController.profileViewSd);

// route.post('/publish', passport.authenticate('jwt',{session:false}),url,upload.single('image'), profileController.publish);

// route.get('/ch2',passport.authenticate('jwt',{session:false}),profileController.ch2);

// route.get('/dashBoard', url, profileController.dashBoard);

// route.get('/setting', url, profileController.setting);

route.post(
  '/getDetails',
  passport.authenticate('jwt', { session: false }),
  profileController.getDetails
);

// route.post('/updateDetails', jsonParser, profileController.updateDetails);

route.post(
  '/follow',
  passport.authenticate('jwt', { session: false }),
  profileController.follow
);
route.post(
  '/addDevice',
  passport.authenticate('jwt', { session: false }),
  profileController.addDevice
);
route.post(
  '/getProfile',
  passport.authenticate('jwt', { session: false }),
  profileController.getProfile
);
module.exports = route;
