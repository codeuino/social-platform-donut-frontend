const express = require('express');
const route = require('./routes/login.routes.js');
const google = require('./config/google.js');
const github = require('./config/github.js');
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
const facebook = require('./config/facebook.js');
const memwatch = require('node-memwatch');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');

//Snapshot at start
const hd = new memwatch.HeapDiff();

mongoose.connect(secret.database, function() {
  console.log('connected');
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
app.use(indexRoutes);

app.get('**',(req,res)=>{
  res.render('error');
});

//Snapshot after routing
const diff = hd.end();
//Diff between both snapshots
console.log(diff);
//checking for leak in memory
memwatch.on('leak', info => {
  for (var x in info) {
    console.log(x + ':' + info[x]);
  }
});
//Stats of memory leakage
memwatch.on('stats', info => {
  for (var x in info) {
    console.log(x + ':' + info[x]);
  }
});

const ser = app.listen(3000, function() {
  console.log('Running');
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
