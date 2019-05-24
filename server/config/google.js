const passport = require('passport');
const google = require('passport-google-oauth20');
const key = require('./credential.js');
const user = require('../schema/user.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  user.findById(id).then(function(user) {
    done(null, user);
  });
});

passport.use(
  new google(
    {
      callbackURL: '/auth/google/redirect',
      clientID: key.oauth.clientID,
      clientSecret: key.oauth.clientSecret
    },
    function(acc, ref, pro, done) {
      user.findOne({ Eid: pro.id }).then(function(use) {
        if (use != null) {
          console.log('Already in database');
          done(null, use);
        } else {
          new user({
            fname: pro.name.givenName,
            lname: pro.name.familyName,
            username: pro.name.givenName + ' ' + pro.name.familyName,
            Eid: pro.id
          })
            .save()
            .then(function(us) {
              done(null, us);
            });
        }
      });
    }
  )
);
