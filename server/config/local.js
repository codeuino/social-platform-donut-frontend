const ExtractJwt = require('passport-jwt').ExtractJwt;
const Strategy = require('passport-jwt').Strategy;
const User = require('../schema/user');
const path=require('path')
const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey='blabla';

module.exports=passport=>{
  passport.use(new Strategy(opts,(opts,(jwt_payload,done)=>{

    User.findOne(jwt_payload.id).then((us)=>{
      if(us)
      {
      return  done(null,us);
      }
      else {
      return   done(null,false)
      }
    })
})))


}
