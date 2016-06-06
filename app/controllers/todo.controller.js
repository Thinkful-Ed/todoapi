
var Todo = require('../models/todo.model');

var TodoCtrl = {

  GetTodo: function(req, res){
    Todo.find({}, function(err, todos){
      if(err) {
        res.json({status: false, error: "Something went wrong"});
        return;
      }
      res.json({status: true, todo: todos});
    });
  },

  PostTodo: function(req, res){
    var todo = new Todo(req.body);
    todo.save(function(err, todo){
      if(err) {
				res.json({status: false, error: "Something went wrong"});
				return;
			}
			res.json({status: true, message: "Todo Saved!!"});
    });
  },

  UpdateTodo: function(req, res){
    var completed = req.body.completed;
    Todo.findById(req.params.id, function(err, todo){
			todo.completed = completed;
			todo.save(function(err, todo){
				if(err) {
					res.json({status: false, error: "Status not updated"});
				}
				res.json({status: true, message: "Status updated successfully"});
			});
		});
  },

  DeleteTodo: function(req, res){
    Todo.remove({_id: req.params.id}, function(err, todos){
      if(err) {
        res.json({status: false, error: "Deleting todo is not successfull"});
        return;
      }
      res.json({status: true, message: "Todo deleted successfully!!"});
    });
  }

}

module.exports = TodoCtrl;
