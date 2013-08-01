
// this just hands off the whole UI to a client-side application

var fs = require('fs');

exports.render = function(req, res) {
    res.render('ui');
};

exports.mock = function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(fs.readFileSync( 'mock/html' ));
};
