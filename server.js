var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

var config = require('./app/config/config');
var router = require('./app/routers/todo.router');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use('/api', router);

mongoose.connect(config.db);
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

app.listen(config.port);
console.log("App listening on port "+config.port);
