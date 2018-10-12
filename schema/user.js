const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bycrypt=require('bcrypt-nodejs')

const user=new Schema({

fname:{
  type:String
},
lname:{
  type:String
},
email:{
  type:String
},
dob:{
  type:String
},
gen:{
  type:Number
},
github:{
  type:String
},
username:{
  type:String
},
pass:{
  type:String
},
Eid:{
  type:Number
},
follower:{

  type:Number
},
following:{
  type:Number
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
  type:[String]
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
