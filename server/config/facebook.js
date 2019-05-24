const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const credentials = require('./credential.js');
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
  new FacebookStrategy(
    {
      clientID: credentials.facebook.clientID,
      clientSecret: credentials.facebook.clientSecret,
      callbackURL: '/auth/facebook/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      user.findOne({ Eid: profile.id }).then(data => {
        if (data) {
          console.log('Already in Database');
          done(null, data);
        } else {
          new user({
            fname: profile.name.givenName,
            lname: profile.name.familyName,
            username: profile.name.givenName + ' ' + profile.name.familyName,
            Eid: profile.id
          })
            .save()
            .then(us => {
              done(null, us);
            });
        }
      });
    }
  )
);
