var http = require('http'),
	express = require('express'),
	app = express(),
	config = require('./config');

config(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
