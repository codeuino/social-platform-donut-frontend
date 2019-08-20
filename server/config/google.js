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
    function(acc, ref, user, done) {
      done(null, user);
    }
  )
);
