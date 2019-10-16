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
const should = chai.should();
const assert = require('assert');
var userId = '';
const otherUserId = '5da73bf3106f2145f348aee2'; // this is the id of other user, so make sure to change it when testing with other userId 
var loggedInToken = '';
chai.use(chaiHttp);

function loginUser(done) {
  const loginInfo = {
    email: 'test3@gmail.com',
    pass: 'password'
  };
  chai.request(server)
    .post('/auth/login')
    .send(loginInfo)
    .end((err, response)=>{
      loggedInToken = response.body.token;
      userId = response.body.user._id;
      // console.log('loggedInToken ', loggedInToken);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('status');
      assert.equal(response.status, 200);
      done();
    })
}

//  function to getDetails 
function getDetails(done){
  chai.request(server)
    .post('/profile/getDetails')
    .set('Authorization', loggedInToken)
    .send({
      email: 'test3@gmail.com'
    })
    .end((err, response)=>{
      assert.equal(response.status, 200);      
      expect(response.body).to.have.property('user');
      done();
    });
}

//  function to get the profile details 
function getProfileDetails(done){
  chai.request(server)
    .post('/profile/getProfile')
    .set('Authorization', loggedInToken)
    .send({
      type: '0',
      id: userId
    })
    .end((err, response)=>{
      assert.equal(response.status, 200);     
      expect(response.body).to.have.property('user');
      done();
    })
}

// function to follow the users
function follow(done){
  const userInfo = {
   user:{
      id: otherUserId,
      type: '0'
   }
  };
  chai.request(server)
    .post('/profile/follow')
    .set('Authorization', loggedInToken)
    .send(userInfo)
    .end((err, response)=>{
      assert.equal(response.status, 200);     
      expect(response.body).to.have.property('status');
      done();
    })
}

describe('PROFILE TESTS: ', ()=>{
  // to login the users
  before((done)=>{
    loginUser(done);
  });

  describe('Should give the details /profile/getDetails', () => {
    it('Should give the profile details: ', (done) => {
      getDetails(done);
    });
  })

  describe('Should retrieve the profile details /profile/getProfile',()=>{
    it('Should retrieve the profile details: ', (done) => {
      getProfileDetails(done);
    });
  })
  
  describe('Should follow the user', ()=>{
    it('Should follow the user: ', (done)=>{
      follow(done);
    });
  })
})
