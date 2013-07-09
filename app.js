
/**
 * Module dependencies.
 */

var express = require('express')
  , storyline = require('./routes/storyline')
  , mongoose = require('mongoose')
  , http = require('http')
  , db = mongoose.createConnection(process.env.MONGOLAB_URI, process.env.MONGOLAB_HOST)
  , path = require('path');

db.on('error', console.error.bind(console, 'connection error:'));
    
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

app.get('/storylines', storyline.find);
app.get('/storylines/:storyline', storyline.findOne);
app.put('/storylines/:storyline', storyline.createOrUpdate);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

