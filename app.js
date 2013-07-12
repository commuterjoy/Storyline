
/**
 * Module dependencies.
 */

var express = require('express')
  , storyline = require('./routes/storyline')
  , mongoose = require('mongoose')
  , http = require('http')
  , db = mongoose.createConnection(process.env.MONGOLAB_URI || 'localhost/storyline_v001')
  , path = require('path');

db.on('error', console.error.bind(console, 'connection error'));
    
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// routes
app.get('/storylines', storyline.find);
app.get('/storylines/:storyline', storyline.findOne);
app.put('/storylines/:storyline', storyline.createOrUpdate);
app.delete('/storylines/:storyline', storyline.remove);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

