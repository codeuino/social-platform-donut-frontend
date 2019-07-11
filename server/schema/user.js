const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require('bcrypt');
const UserSchema = new Schema({
  type: {
    type: Number,
    required: true
  },
  name: {
    type: String
  },
  profilepic:{
    type:String
  },
  email: {
    type: String,
    unique:true
  },
  dob: {
    type:Date
  },
  gender: {
    type: Number,
    required:true
  },
  website : {
    type : String
  },
  pass: {
    type: String,
    required:true
  },
  followersList: {
    type : [Schema.Types.ObjectId],
    default:[]
  },
  followingList: {
    type : [Schema.Types.ObjectId],
    default:[]
  },
  devices :{
    type: [Schema.Types.ObjectId],
    default:[]
  },
  bio: {
    type: String
  },
  lang: {
    type: [String]
  },
  location:{
    country:{
      type:String
    },
    city:{
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
  },
  contributorUnder : {
    type: [String],
    default:[]
  },
  Todos: [
    {
    type: Schema.Types.ObjectId,
    ref:'Todo'
    }
  ],
  Events : [
    {
      type:Schema.Types.ObjectId,
      ref:'Event'
    }
  ]

});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('pass')) return next();
  bycrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bycrypt.hash(user.pass, salt, function(err, hash) {
      user.pass = hash;
      next();
    });
  });
});

UserSchema.methods.compare = function(pass) {
  return bycrypt.compareSync(pass, this.password);
};

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
