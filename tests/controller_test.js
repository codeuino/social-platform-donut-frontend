process.env.TESTING = true
const {expect} = require('chai')
const profilecontroller=require('../controller/profile.controller');
const secret=require('.././config/credential.js');
const mongoose = require('mongoose');
const request = require('request')
const BASE_URL = 'http://localhost:3000/'
const express = require('express');
app=express();

describe('controllers',()=>{
    let server;
    before((done) => {
        mongoose.connect(secret.database, function () {
            server=app.listen(3000,()=>{
                done()
            })
        })
      })
      after(() => {
        server.close()
      })
      describe('users',()=>{
    it('should add user',(done)=>{
      request.post(`${BASE_URL}/auth/userlogin`,
      {
          fname:'tushar',lname:'goel',email:'tushar.goel.dav@gmail.com',dob:'29/08/1999',github:'TG1999',username:'TG1999',pass:'test'
      },(err,res,body)=>{
          if(err){
              console.log(err)
          }
          else{
              console.log(res)
              done()
          }
      })
    })
})
})

