
var storylineSchema = require('../models/storyline.js')
  , mongoose = require('mongoose')
  , host = 'localhost'
  , story = 'storyline_v001'
  , db = mongoose.createConnection(host, story);

var Storyline = db.model('Storyline', storylineSchema);

var expand_resource_to_uri = function (req, resource) {
    return ['http://', req.host + ':3000', resource].join('/');
}

exports.find = function(req, res) {
    Storyline.find(function (err, storylines) {
        res.setHeader('Content-Type', 'application/json');
        res.send(storylines.map(function (storyline) { return expand_resource_to_uri(req, 'storylines/' + storyline.id) } ));
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

exports.remove = function(req, res) {
    console.log('delete ' + req.params.storyline);
    Storyline.remove({'id': req.params.storyline}, function (err, storyline) {
        if (err) console.log(err)
        if (!storyline) res.send(404)
        res.send(200, '{}');
    });    
};

exports.createOrUpdate = function(req, res) {
    var storyline = new Storyline({
        id: req.params.storyline,
        seeAlso: req.body.seeAlso || [] 
    });
    storyline.save(function (err) {
        if (err) console.log(err)
        res.send('storyline saved');
    })
};

