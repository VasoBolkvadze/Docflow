var passport = require('passport');
var auth = require('../config/authorization');
var path = require('path');
var eventStore = require('../eventstore')('http://localhost:2113/',['admin','changeit']);
var fileUpload = require('../middleware/fileUpload')();

module.exports.setup = function(app){
	app.get('/',auth.ensureAuth, function(req,res){
		res.render('index',{user:req.user});
	});
	app.get('/login',function(req,res){
		res.render('login',{ message: req.flash('error') });
	});

	app.get('/views/*',function(req,res){
		res.render(req.params[0]);
	});

	app.get('/features/*',function(req,res){
		var fileName = req.params[0];
		var segments = fileName.split('.');
		if(segments.length>=2 && segments[1]=='jade'){
			res.render(segments[0] + '.jade')
		}
		else{
			var p = path.resolve(__dirname + '/../public/features/' + fileName);
			res.sendfile(p);
		}
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

	app.post('/api/crspds/save',auth.requiresAuth, fileUpload,function(req,res){
		var settings = {
			eventType:'ShemovidaKorespondencia',
			data:req.body.model
		};
		eventStore.appendToStream('korespondenciebi'
									, settings
									, function(err,result){
										if(!err)
											res.send(200);
										else
											res.send(500);
									});
	});
};