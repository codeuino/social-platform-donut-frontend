const ExtractJwt = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'mySecret';

module.exports = passport => {
  passport.use(
    'jwt',
    new JWTStrategy(opts, (token, next) => {
      try {
        next(null, token);
      } catch (err) {
        next(err);
      }
    })
  );
};
