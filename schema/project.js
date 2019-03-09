var mongoose=require('mongoose');
var schema=mongoose.Schema;




var project=new schema({
author:{
    type: String
    //username of the creator
  },
pname:{
    type:String
    //name of the project
  },
pid:{
  type:String,
  unique:true,
  required:true
  // unique project id for each project
},
links:{
  type:Object
  //Fetch all links in one go regarding the project
},
Lang:{
  type:Object
},
content:{
  type:String
},
upvote:{
  type:Object
  /* [
  {username:"12312"},
  {username:"21312"}
  ]
   One query foe everything
  */
},
downvote:{
  type:Object
//same logic as for upvotes
},
proid:{
  type:Number
},
comments:{
  type:Object
  /*
  [
  {"username":"#12312",
  "comment" : "Wow",
  "comment_timestamp": Isotimestamp  }
  ]
  //Any further data requirements can be added here
  */
},

create_date:{
  type:Date
  // using date object for making queries based on dates
}
});

const proj=mongoose.model('project',project);
module.exports=proj
