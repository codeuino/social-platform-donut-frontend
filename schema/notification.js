var mongoose=require('mongoose');
var schema=mongoose.Schema;

var notification=new schema({

 fname:{
     type:String
 }  ,
 lname:{
     type:String
 },
 upvoteId:{
     type:String
 },
 proid:{
     type:Number
 }   ,
  userid:{
     type:String
  }
});


var notification=mongoose.model('notificaiton',notification);
module.exports=notification;