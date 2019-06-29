var mongoose=require('mongoose');
var schema=mongoose.Schema;
ObjectId=schema.ObjectId
var post=new schema({
  user:{
    type:ObjectId
  },
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  image:{
    type:String
  },
  Upvotes:{
    type:Object
  },
  DownVotes:{
    type:Object
  },
  tags:{
    type:Array
  },
  Comments:{
      type:[{user:ObjectId,
      content:String}]
  },
  CreatedAt:{
    type:Date
  },
  UpdatedAt:{
    type:Date
  },
  //Type will be Posts,Project,Scholarship
  type:{
    type:String
  }
})