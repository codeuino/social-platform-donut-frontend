process.env.TESTING = true;
const { expect } = require('chai');
const chai = require('chai');
const express = require('express');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = require('assert');
const todoId = Math.round(Math.random() * 100);
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
      // console.log('login response : ', response.body);
      loggedInToken = response.body.token;
      console.log('loggedInToken ', loggedInToken);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('status');
      done();
    })
}

function addTodos(done){
  const todoInfo = {
    title: "testing todo",
    id: todoId.toString()
  };
  chai.request(server)
    .post('/todos/addTodo')
    .set('Authorization', loggedInToken)
    .send(todoInfo)
    .end((err, res)=>{
      // console.log('add todos: ',res.body);
      expect(res.body).to.be.an('object');
      assert.equal(res.status, 200);
      done();
    });
}

function getTodos(done){
  chai.request(server)
    .post('/todos/getTodos')
    .set('Authorization', loggedInToken)
    .end((err, res)=>{
      // console.log('get todos :', res.body);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('todos');
      assert.equal(res.status, 200);
      done();
    });
}

function completeTodos(done){
  chai.request(server)
    .post('/todos/completeTodo')
    .set('Authorization', loggedInToken)
    .send({id: todoId.toString()})
    .end((err, res)=>{
      // console.log('complete todo ', res.body);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      assert.equal(res.status, 200);
      done();
    })    
} 

function deleteTodos(done){
  chai.request(server)
    .post('/todos/deleteTodo')
    .set('Authorization', loggedInToken)
    .send({id: todoId.toString()})
    .end((err, res)=>{
      console.log('delete todo ', res.body);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      assert.equal(res.status, 200);
      done();
    });
}

// grouping the tests 
describe('TODOS TESTS: ',()=>{
  // before adding we should be a logged in user 
  before((done)=>{
    // logging in
    console.log('todoId: ', todoId)
    loginUser(done);
  });

  // add todos 
  it('Should add the todos: ', (done)=>{
    addTodos(done);
  });

  // get todos 
  it('Should retrieve todos: ', (done)=>{
    getTodos(done);
  });

  // complete todos 
  it('Should complete todos: ', (done)=>{
    completeTodos(done);
  });

  // delete todos 
  it('Should delete todos: ',(done)=>{
    deleteTodos(done);
  });

});

