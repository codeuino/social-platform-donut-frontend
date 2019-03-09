const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bycrypt=require('bcrypt-nodejs')

const user=new Schema({
  name:{
    type:String,
    required:[true,'Name is mandatory']
    //Name cant be blank
  },
  email:{
    type:String
    //Email can be blank in case the user signs up using facebook or github and
    //we dont have email in the scope
  },
  dob:{
    type:Date
    //Date for Dob, as on string the query Cannot be performed
  },
  gen:{
    type:Number,
    enum:[1,2] //male : 1,female : 2
  },
  github:{
    type:String
    //url for github profile query
  },
  username:{
    type:String,
    unique:true
    // username has to be unique
  },
  pass:{
    type:String
  },
  Eid:{
    type:Number
  },
  followers:{
    type:Object
    /*
    [
    {username:"abcd"},{username:"bcsa"}
    The benifit of using a object rather than the earlier string is beacuse there
    will be just one query for finding the number of followers and people
    following
     */
  },
  following:{
    type:Object
    //same logic as in case above
  },
  status:{
    type:String
  },
  Eid:{
    type:String
  },
  bio:{
    type:String
  },
  lang:{
    type:Object
  }
});

user.pre('save',function(next){
  var user=this;
  if(!user.isModified('pass')) return next();
  bycrypt.genSalt(10,function(err,salt){

    if(err)
    {
      return next(err);
    }
    bycrypt.hash(user.password,salt,null,function(err,hash){
      user.pass=hash;
      next();
    })
  })
});

user.methods.compare=function(pass){
return bycrypt.compareSync(pass,this.password);
}

const use=mongoose.model('user',user);
module.exports=use;
