const passport = require('passport');
const facebook = require('passport-facebook-token');
const user=require('../schema/user.js');
const secret=require('./credential.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  user.findById(id).then(function(user) {
    done(null, user);
  });
});

passport.use('facebookToken', new facebook({
  clientID: secret.facebook.clientID,
  clientSecret: secret.facebook.clientSecret,
  callbackURL: '/auth/facebook/redirect'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    
    const existingUser = await User.findOne({ "facebook.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch(error) {
    done(error, false, error.message);
  }
}));