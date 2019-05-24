var mongoose=require('mongoose');
var schema=mongoose.Schema;




var project=new schema({
  pname:{
    type:String
  },
pid:{
  type:String
},
github:{
  type:String
},
Lang:{
  type:[String]
},
shortDesc:{
  type:String
},
content:{
  type:String
},
linkedUsers:{
  type : [Number]
},
upvote:{
  type:[String]
},
downvote:{
  type:[String]
},
proid:{
  type:Number
},
createdAt:{
  type:Date
},
endAt:{
  type:Date
},
image:{
type:String
}
});

const proj=mongoose.model('project',project);
module.exports=proj
