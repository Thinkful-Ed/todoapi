var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TodoSchema = Schema({
  todo: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_by: {
    type: Date,
    default: Date.now
  }
});

var TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
