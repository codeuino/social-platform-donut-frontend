process.env.TESTING = true;
const { expect } = require('chai');
const secret = require('.././config/credential.js');
const mongoose = require('mongoose');
const request = require('supertest');
const passport = require('passport');
const indexRoutes = require('../routes/index.routes');
const express = require('express');
const app = express();
const path = require('path');
const cookie = require('cookie-session');
app.use(
  cookie({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['CAPEDCRUSADER']
  })
);
app.use(express.static(path.join('..', path.join(__dirname, 'views'))));
app.use(passport.initialize());
app.use(passport.session());
app.use(indexRoutes);
app.set('view engine', 'ejs');
describe('controllers', () => {
  let server;
  before(done => {
    mongoose.connect(secret.database, function() {
      server = app.listen(5000, () => {
        console.log('running at 5000');
        done();
      });
    });
  });
  after(() => {
    server.close();
  });
  it('should add user', done => {
    request(server)
      .post('/auth/userlogin')
      .send({
        fname: 'tushar',
        email:'tushar.goel.dav@gmail.com',
        lname: 'goel',
        dob: '29/08/1999',
        github: 'TG1999',
        username: 'TG1999',
        pass: 'test'
      })
      .expect(200)
      .expect(/Codeuino/, done);
  });
  it('logout user', done => {
    request(server)
      .get('/auth/logout')
      .expect(302)
      .expect('Found. Redirecting to /', done);
  });
  
});
