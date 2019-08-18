const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cors = require('cors')
const app = express();
const cookie = require('cookie-session');
const GoogleStrategy = require('./config/google')
const GithubStrategy = require('./config/github')
const {secret,db, VAPID_KEYS} = require('./config/credential.js');
const indexRoutes = require('./routes/index.routes');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');
const bodyParser = require('body-parser')
const webPush = require('web-push')
mongoose.connect(db,{useNewUrlParser:true}, function() {
  console.log('db connected');
});
app.use(cors())
webPush.setVapidDetails('mailto:test@test.com',VAPID_KEYS.Public,VAPID_KEYS.Private)
app.use(function(req, res, next) {
  next();
});
app.use(passport.initialize());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(
  cookie({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['CAPEDCRUSADER']
  })
);
app.post("/",(req,res)=>{
  console.log(req.body)
  res.json({msg:'HI'})
})
app.use(expressValidator());
require('./config/local.js')(passport)
app.use(indexRoutes);








app.get('**',(req,res)=>{
  res.status(404).json({status:0})
});

const PORT = process.env.PORT || 3000

const ser = app.listen(PORT, function() {
  console.log(`Running at ${PORT}`);
});

// const io = socket(ser);

// io.on('connection', function(socket) {
//   socket.on('downvote', function(data) {
//     user.find().then(function(out) {
//       out.forEach(function(x) {
//         if (x['Eid'] == data.sign) {
//           new notification({
//             fname: x['fname'],
//             lname: x['lname'],
//             upvoteId: x['Eid'],
//             proid: data.pro['proid'],
//             userid: data.pro['pid']
//           })
//             .save()
//             .then(function(notif) {
//               console.log(notif);
//             });
//         }
//       });
//     });
//   });
// });
