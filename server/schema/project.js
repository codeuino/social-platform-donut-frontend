var mongoose=require('mongoose');
var schema=mongoose.Schema;
var project=new schema({
pname:{
    type:String
  },
authorId:{
  type:schema.Types.ObjectId,
},
github:{
  type:String
},
Lang:{
  type:[String]
},
description:{
  type:String
},
content:{
  type:String
},
upDownVote : {
  type: Map,
  of:String,
  default:{}
},
createdAt:{
  type:String
},
image:{
type:String
}
});

const ProjectModel=mongoose.model('project',project);
module.exports= ProjectModel
