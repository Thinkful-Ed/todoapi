var express = require('express');
var router = express.Router();
// var Todo = require('../models/todo.model');
var TodoController = require('../controllers/todo.controller');

// Get all Todo
router.get('/todo', TodoController.GetTodo);

// Create new Todo
router.post('/todo', TodoController.PostTodo);

// Delete a todo based on :id
router.delete('/todo/:id', TodoController.DeleteTodo);

// Update a todo based on :id
router.put('/todo/:id', TodoController.UpdateTodo);

module.exports = router;
