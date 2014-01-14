var path = require('path');
var flash = require('connect-flash');
var express = require('express');
var passport = require('passport');
module.exports.setup = function(app){
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, '/../app/views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('fe664fb0-7d15-11e3-baa7-0800200c9a66'));
	app.use(express.session());
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, '/../public')));
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}
};