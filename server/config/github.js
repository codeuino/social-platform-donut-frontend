const passport = require('passport');
const github = require('passport-github');
const user = require('../schema/user.js');
const secret = require('./credential.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  user.findById(id).then(function(user) {
    done(null, user);
  });
});

passport.use(
  new github(
    {
      clientID: secret.github.clientID,
      clientSecret: secret.github.clientSecret,
      callbackURL: '/auth/github/redirect'
    },
    function(ac, re, pro, done) {
      done(null,pro)
    }
  )
);
