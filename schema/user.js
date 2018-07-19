const mongoose=require('mongoose');
const Schema=mongoose.Schema;


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
}

});
const use=mongoose.model('user',user);
module.exports=use;
