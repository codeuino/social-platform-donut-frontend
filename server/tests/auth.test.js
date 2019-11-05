process.env.TESTING = true;
const { expect } = require('chai');
const chai = require('chai');
const secret = require('../config/credential.js');
const mongoose = require('mongoose');
const passport = require('passport');
const indexRoutes = require('../routes/index.routes');
const express = require('express');
const app = express();
const path = require('path');
const cookie = require('cookie-session');
const chaiHttp = require('chai-http');
const server = require('../server');
var userId = '';
chai.use(chaiHttp);

function addUser(server,done) {
  const userInfo = {
    type:  "0",
    name: "Rupesh",
    website: "www.github.com/Rupeshiya",
    pass: "password",
    bio: "full stack",
    email: "test3@gmail.com"
  };
  chai.request(server)
    .post('/auth/signup')
    .send(userInfo)
    .end((err, response)=>{
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('status');
      // expect()
      done();
    });
}

function loginUser(server,done) {
  const loginInfo = {
    email: 'test3@gmail.com',
    pass: 'password'
  };
  chai.request(server)
    .post('/auth/login')
    .send(loginInfo)
    .end((err, response)=>{
      console.log('login response : ', response.body);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('status');
      done();
    })
}

function logoutUser(server,done) {
  chai.request(server)
    .get('/auth/logout')
    .end((err, response)=>{
      console.log('logout ', response.body);
      expect(response.body).to.be.an('object');
      expect(response).to.have.property('status');
      done();
    })
}

describe('controllers', () => {
  // register test
  it('should register the user', (done) => {
    addUser(server, done);
  });

  // login the users 
  it('should login the users', (done)=>{
    loginUser(server, done);
  })

  // logout the users
  it('should logout user', done => {
    logoutUser(server, done);
  });
});
