// server.js file...
var http = require("http")
var request = require("request")
var S = require('string');
var port = process.env.PORT || 8001

http.createServer(function(req, rsp){


  console.log(req)

  var options = { uri: 'http://www.theguardian.com' + req.url, qs: { 'view': 'mobile' }}

  request(options, function(err, response, body){
    
        rsp.writeHead(200);
    
        var a = body.replace(/href="http:\/\/www.(theguardian.com|guardian.co.uk)\//g, 'href="/');
        var b = a.replace(/<\/body>/g, "<script src='http://localhost:3000/javascripts/proxy/boot.js'>console.log('a')</script></body>");

        rsp.end(b)

  })

}).listen(port)

console.log("listening on port " + port)
