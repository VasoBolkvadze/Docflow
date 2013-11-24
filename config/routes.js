var passport = require('passport');
var auth = require('../config/authorization');

module.exports.defineRoutes = function(app){
	app.get('/',auth.ensureAuth, function(req,res){
		res.render('index',{user:req.user});
	});
	app.get('/login',function(req,res){
		res.render('login',{ message: req.flash('error') });
	});

	app.post('/api/login'
		,passport.authenticate('local',{ failureRedirect: '/login', failureFlash: true })
		,function(req, res) {
			res.redirect('/');
		}
	);
	app.post('/api/logout', function(req, res){
		req.logOut();
		res.redirect('/login');
	});
};