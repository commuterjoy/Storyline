// server.js file...
var http = require("http")
var request = require("request")
var S = require('string');
var port = process.env.PORT || 8001
var fs = require('fs');

// Injects a blob of JS to bootstrap the storyline tagger   
var injectBootstrap = function (path, html) {
    var jsBootstrap = fs.readFileSync( path );
    return html.replace(/<\/body>/g, "<script>console.log('a');" + jsBootstrap + "</script></body>");
    }

var injectStylesheet = function (path, html) {
    var css = fs.readFileSync( path );
    return html.replace(/<\/body>/, "<style>" + css + "</style></body>");
    }

// Replaces internal href's to guardian.com with a reference to the relative domain
var fixInternalLinks = function (html) {
    return html.replace(/href="http:\/\/www.(theguardian.com|guardian.co.uk)\//g, 'href="/');
}


http.createServer(function(req, rsp){
  
  // var rootHost = 'http://localhost:3000' // 'http://www.theguardian.com';
  var rootHost = 'http://www.theguardian.com';
  var options = { uri: rootHost + req.url, qs: { 'view': 'mobile' }}
  
  request(options, function(err, response, body){

        var jsRangeCore = injectBootstrap('public/javascripts/proxy/rangy-1.2.3/rangy-core.js', body)
        var jsRangeClass = injectBootstrap('public/javascripts/proxy/rangy-1.2.3/rangy-cssclassapplier.js', jsRangeCore)
        var jsBoot = injectBootstrap('public/javascripts/proxy/boot.js', jsRangeClass)
        var css = injectStylesheet('public/stylesheets/proxy/style.css', jsBoot)

        rsp.writeHead(200);
        rsp.end( css ); 
  })

}).listen(port)

console.log("listening on port " + port)
