const ExtractJwt = require('passport-jwt').ExtractJwt;
const Strategy = require('passport-jwt').Strategy;
const User = require('../schema/user');
const path=require('path')
const opts={};
opts.jwtFromRequest=ExtractJwt.fromHeader('auth');
const {secret} = require('../config/credential')
opts.secretOrKey=secret;

module.exports=passport=>{
  passport.use(new Strategy(opts,(jwt_payload,done)=>{
    try {
      done(null,jwt_payload.user)
    } catch (error) {
      done(error)
    }}
))


}
