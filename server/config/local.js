const ExtractJwt = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
const {secret} = require('../config/credential')
opts.secretOrKey='mySecret'

module.exports= passport => {
  passport.use(new JWTStrategy(opts,(token, next) => {
      try {
        next(null,token)
      } catch (err) {
        next(err)
      }
    }
  ))
  
}
