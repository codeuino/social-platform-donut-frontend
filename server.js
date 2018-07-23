const express = require('express');
const route = require('./routes/route.js');
const profile = require('./routes/profile.js');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const cookie = require('cookie-session');
const url = require('body-parser').urlencoded({ extended: false });

const User = require('./schema/user');
const Project = require('./schema/project');

require('./config/google');
require('./config/local');

mongoose.connect(
  'mongodb://uphaar:caped23@ds121461.mlab.com:21461/codeuino',
  function() {
    console.log('connected');
  }
);

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(
  cookie({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['CAPEDCRUSADER']
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(route);
app.use(profile);

app.post('/autocomplete', url, (req, res) => {
  if (!req.body.value) {
    res.send('');
  } else {
    let regex = new RegExp(req.body.value, 'i');
    let item = req.body.item;
    let query = {};
    query[item] = regex;

    if (req.body.item == 'pname') {
      Project.find(query, (err, project) => {
        res.send(project);
      });
    } else if (req.body.item == 'username' || req.body.item == 'email') {
      User.find(query, (err, user) => {
        res.send(user);
      });
    }
  }
});

app.listen(3000, function() {
  console.log('Running');
});
