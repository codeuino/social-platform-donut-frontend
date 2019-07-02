var mongoose=require('mongoose');
var schema=mongoose.Schema;
ObjectId=schema.ObjectId
var postSchema=new schema({
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
  //Type will be Posts,Project,Scholarship
  type:{
    type:String
  }
})
postSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps
const Post = mongoose.model('post', postSchema);
module.exports = Post;