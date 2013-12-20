var multiparty = require('connect-multiparty')();
var path = require('path');
var async = require('async');
var fs = require('fs');
var uuid = require('node-uuid');
module.exports = function(options){
	options = options || {};
	return function(req, res, next) {
		multiparty(req,res,function(err){
			if(err){
				next(err);
				return;
			}
			var files = [];
			for(var i=0; i<req.body.fileCount; i++){
				var file = req.files['file'+i];
				var segments = file.originalFilename.split('.');
				var ext = segments.length>1 ? segments[1] : '';
				var oldPath = file.path;
				var newFileName = uuid.v1() + '.' + ext;
				var newPath = path.resolve(__dirname + '/../uploads/') + '\\' + newFileName;
				files.push({
					oldPath:oldPath,
					newPath:newPath,
					name:newFileName
				});
			}
			delete req.files;
			var rename = function(file,cb){
				fs.rename(file.oldPath,file.newPath,function(err){
					if(!err)
						cb(null,file.name);
				});
			};
			async.map(files,rename,function(err,fileNames){
				if(!err){
					var model = JSON.parse(req.body.model);
					model.fileNames = fileNames;
					req.body.model = model;
					next();
				}else{
					res.send(500);
				}
			});
		});
	}
};