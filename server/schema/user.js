const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require('bcrypt');
const user = new Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  profilepic:{
    type:String
  },
  email: {
    type: String
  },
  dob: {
    type:Date
  },
  gender: {
    type: Number
  },
  website : {
    type : String
  },
  username: {
    type: String
  },
  pass: {
    type: String
  },
  Eid: {
    type: Number
  },
  followersList: {
    type : [Number]
  },
  followingList: {
    type : [Number]
  },
  status: {
    type: String
  },
  bio: {
    type: String
  },
  lang: {
    type: [String]
  },
  location:{
    lat:{
      type:String
    },
    long:{
      type:String
    }
  },
  last_login:{
    lat:{
      type:String
    },
    long:{
      type:String
    }
  },
  social:{
    type:Schema.Types.ObjectId,
    ref:'social'
  }
});

user.pre('save', function(next) {
  var user = this;
  if (!user.isModified('pass')) return next();
  bycrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bycrypt.hash(user.password, salt, null, function(err, hash) {
      user.pass = hash;
      next();
    });
  });
});

user.methods.compare = function(pass) {
  return bycrypt.compareSync(pass, this.password);
};

const use = mongoose.model('user', user);
module.exports = use;
