
var storylineSchema = require('../models/storyline.js')
  , mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'storyline');

var Storyline = db.model('Storyline', storylineSchema);

exports.find = function(req, res) {
    Storyline.find(function (err, storylines) {
        res.send(storylines);
    });
};

exports.findOne = function(req, res) {
    console.log('finding ' + req.params.storyline);
    Storyline.findOne({'id': req.params.storyline}, function (err, storyline) {
        if (err) console.log(err)
        if (!storyline) res.send(404)
        res.send(storyline);
    });    
};

exports.createOrUpdate = function(req, res) {
    var storyline = new Storyline({ id: req.params.storyline });
    storyline.save(function (err) {
        if (err) console.log(err)
        res.send('storyline saved');
    })
};

