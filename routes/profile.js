const express=require('express');
const route=express.Router();
const bodyparser=require('body-parser')
var url=bodyparser.urlencoded({extended:false});
const user=require('../schema/user.js');
const proj=require('../schema/project.js');

const auth=function(req,res,next){
  if(req.user==null)
  {
  res.redirect('/')
  }
  else {
    next();
  }
};

route.get('/profile/:id',auth,function(req,res){
  user.findOne({Eid:req.user.Eid}).then(function(us){
    req.params.id=us.Eid;
    res.redirect('/profileview/'+req.params.id);
  })

});

route.get('/profileview/:sd',auth,url,function(req,res){
proj.find({pid:req.params.sd}).then(function(ques){
user.findOne({Eid:req.params.sd}).then(function(use){
    res.render('front',{use:use,ques:ques,sign:req.user});
})


});

})


route.get('/profilecheck/:sd',auth,url,function(req,res){
proj.find({pid:req.user.Eid}).then(function(ques){
  res.render('front',{use:req.user,ques:ques});
})

})
route.post('/publish',url,function(req,res){
new proj({
"pname":req.body.contentname,"pid":req.user.Eid,"github":req.body.git,"Lang":req.body.lang,"content":req.body.cont,"upvote":'',"downvote":'',"proid":Math.floor(Math.random()*100000)
}).save().then(function(){
  res.redirect('/profileview/'+req.user.Eid);
})
})

route.post('/upvote',url,function(req,res){
  proj.findOne({proid:req.body.project}).then(function(proj){

var p=0;
    for(v=0;v<proj.upvote.length;v++)
    {
        if(req.body.client==proj.upvote[v])
        {
          p=1;
          proj.upvote.pop(req.body.client);
          proj.save();
          console.log("already present");
          break;
        }
    }

if(p==0)
{
  proj.upvote.push(req.body.client);
  proj.save();
}

res.redirect('/profileview/'+proj.pid);

  });

});

route.post('/downvote',url,function(req,res){
  proj.findOne({proid:req.body.project}).then(function(proj){

  var p=0;
    for(v=0;v<proj.downvote.length;v++)
    {
        if(req.body.client==proj.downvote[v])
        {
          p=1;
          proj.downvote.pop(req.body.client);
          proj.save();
          console.log("already present");
          break;
        }
    }

  if(p==0)
  {
  proj.downvote.push(req.body.client);
  proj.save();
  }

  res.redirect('/profileview/'+proj.pid);

  });


});
module.exports=route;
