var http = require('http');
var config = require('./config/express');
var routes = require('./config/routes');
var fs = require('fs');
var path = require('path');
var app = config.express();
routes.defineRoutes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
