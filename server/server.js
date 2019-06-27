const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const app = express();
const cookie = require('cookie-session');
const socket = require('socket.io');
const user = require('./schema/user.js');
const secret = require('./config/credential.js');
const notification = require('./schema/notification.js');
const indexRoutes = require('./routes/index.routes');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');

mongoose.connect(secret.db,{useNewUrlParser:true}, function() {
  console.log('db connected');
});

const loged = [];

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.set('views',path.join(__dirname+"/views"));
app.use(methodOverride('_method'));

app.use(
  cookie({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['CAPEDCRUSADER']
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());
require('./config/local.js')(passport)
app.use(indexRoutes);

app.get('**',(req,res)=>{
  res.render('error');
});

const PORT = process.env.PORT || 3000

const ser = app.listen(PORT, function() {
  console.log(`Running at ${PORT}`);
});

const io = socket(ser);

io.on('connection', function(socket) {
  socket.on('downvote', function(data) {
    user.find().then(function(out) {
      out.forEach(function(x) {
        if (x['Eid'] == data.sign) {
          new notification({
            fname: x['fname'],
            lname: x['lname'],
            upvoteId: x['Eid'],
            proid: data.pro['proid'],
            userid: data.pro['pid']
          })
            .save()
            .then(function(notif) {
              console.log(notif);
            });
        }
      });
    });
  });
});
