const express=require('express');
const route=require('./routes/route.js')
const profile=require('./routes/profile.js')
const mongoose=require('mongoose');
const passport=require('passport');
const google=require('./config/google.js')
const app=express();
const cookie=require('cookie-session');
const socket=require('socket.io');
const user=require('./schema/user.js');
const proj=require('./schema/project.js');
const notification=require('./schema/notification.js')
const secret=require('./config/secret.js')

mongoose.connect(secret.database,function(){
  console.log('connected');
})

var loged = [];

app.set('view engine','ejs');
app.use(express.static('views'));

app.use(cookie({
  maxAge:24*60*60*1000,
  keys:[secret.secret]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(route);
app.use(profile);


var ser = app.listen(3000,function(){
  console.log('Running');
});

const io = socket(ser);

io.on('connection',function(socket){
    socket.on('downvote',function(data){
        user.find().then(function (out) {
            out.forEach(function(x){
                if(x['Eid']==data.sign)
                {
                    new notification({"fname":x['fname'],"lname":x['lname'],"upvoteId":x['Eid'],"proid":data.pro['proid'],"userid":data.pro['pid']}).save().then(function(noti){
                        console.log(notif);
                    })
                }
            })
        })
    })
})
