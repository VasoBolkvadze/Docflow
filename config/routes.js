var passport = require('passport');
var auth = require('../config/authorization');
var path = require('path');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var async = require('async');
var fs = require('fs');
module.exports.defineRoutes = function(app){
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

	app.post('/api/crspds/save',multipartMiddleware,function(req,res){
		//TODO:REFACTOR THIS FUNCTION
		var files = [];
		for(var i=0; i<req.body.fileCount; i++){
			var file = req.files['file'+i];
			var segments = file.originalFilename.split('.');
			var ext = segments.length>1 ? segments[1] : '';
			var oldPath = file.path;
			var newFileName = Math.uuid() + '.' + ext;
			var newPath = path.resolve(__dirname + '/../uploads/') + '\\' + newFileName;
			files.push({
				oldPath:oldPath,
				newPath:newPath,
				name:newFileName
			});
		}
		var rename = function(file,cb){
			fs.rename(file.oldPath,file.newPath,function(err){
				if(!err)
					cb(null,file.name);
			});
		};
		async.map(files,rename,function(err,fileNames){
			if(!err){
				//TODO: push event to the eventstore, with eventData + filenames
				var crspd = JSON.parse(req.body.model);
				crspd.files = fileNames;
				var event = {
					type:'ShemovidaKorespondencia',
					data:crspd
				};
				console.log(event);
				delete req.files;
				res.send(200);
			}else
				res.send(500);
		});
	});
};