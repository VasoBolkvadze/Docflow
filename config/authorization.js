var db = require('../utils/mockdb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {
		db.users.find.byUsername(username, function(err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false, { message: 'მომხმარებელი ' + username + ' არ არსებობს.'}); }
			if (user.password != password) { return done(null, false, { message: 'პაროლი არასწორია.' }); }
			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	db.users.find.byId(user.id, function (err, user) {
		done(err, user);
	});
});
var authenticateManually = function(req,res,next){
	var auth = passport.authenticate('local',{ failureRedirect: '/login', failureFlash: true });
	req.body.username = 'operatori';
	req.body.password = '1';
	auth(req,res,next);
};
var requiresAuth = function(req,res,next){
	if (!req.isAuthenticated()){
		//NOTICE: developement only, manual authentication.
		authenticateManually(req,res,next);
		//toggle for production
		//res.send(401);
	}
	else
		next();
};
var ensure = function (req, res, next) {
	if (!req.isAuthenticated()){
		//NOTICE: developement only, manual authentication.
		authenticateManually(req,res,next);
		//toggle for production
		//res.redirect('/login');
	}
	else
		next();
};
module.exports = {ensureAuth:ensure,requiresAuth:requiresAuth};