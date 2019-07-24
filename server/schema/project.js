var mongoose=require('mongoose');
var schema=mongoose.Schema;
var project=new schema({
pname:{
    type:String
  },
authorId:{
  type:schema.Types.ObjectId,
},
authorName:{
  type:String
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
},
comments:[
  {
    author: String,
    author_id: schema.Types.ObjectId,
    comment: String,
    date: {
      type:Date,
      default:Date.now
    },
    id: String
  }
]
});

const ProjectModel=mongoose.model('project',project);
module.exports= ProjectModel
