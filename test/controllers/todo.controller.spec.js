var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

var Todo = require('../../app/models/todo.model');

describe("Unit test for Todo API", function(){

  describe("Get all todo", function(){
    it("should return all todo", function(done){
      var TodoMock = sinon.mock(Todo);
      var expectedResult = {status: true, todo: []};
      TodoMock.expects('find').yields(null, expectedResult);
      Todo.find(function (err, result) {
				TodoMock.verify();
				TodoMock.restore();
        expect(result.status).to.be.true;
				done();
			});
    });

    it("should return error", function(done){
      var TodoMock = sinon.mock(Todo);
      var expectedResult = {status: false, error: "Something went wrong"};
      TodoMock.expects('find').yields(expectedResult, null);
      Todo.find(function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

  describe("Post a new todo", function(){
    it("should create new post", function(done){
      var TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock'}));
			var todo = TodoMock.object;
      var expectedResult = { status: true };
      TodoMock.expects('save').yields(null, expectedResult);
      todo.save(function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    it("should return error, if post not saved", function(done){
      var TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock'}));
      var todo = TodoMock.object;
      var expectedResult = { status: false };
      TodoMock.expects('save').yields(expectedResult, null);
      todo.save(function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });


  describe("Update a new todo by id", function(){
    it("should updated a todo by id", function(done){
      var TodoMock = sinon.mock(new Todo({ completed: true}));
      var todo = TodoMock.object;
      var expectedResult = { status: true };
      TodoMock.expects('save').yields(null, expectedResult);
      todo.save(function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    it("should return error if update action is failed", function(done){
      var TodoMock = sinon.mock(new Todo({ completed: true}));
      var todo = TodoMock.object;
      var expectedResult = { status: false };
      TodoMock.expects('save').yields(expectedResult, null);
      todo.save(function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

  describe("Delete a todo by id", function(){
    it("should delete a todo by id", function(done){
      var TodoMock = sinon.mock(Todo);
      var expectedResult = { status: true };
			TodoMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
      Todo.remove({_id: 12345}, function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    it("should return error if delete action is failed", function(done){
      var TodoMock = sinon.mock(Todo);
      var expectedResult = { status: false };
      TodoMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
      Todo.remove({_id: 12345}, function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    })
  });

});
