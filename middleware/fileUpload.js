var multiparty = require('connect-multiparty')();
var path = require('path');
var async = require('async');
var fs = require('fs');
var uuid = require('node-uuid');
module.exports = function(req, res, next) {
	multiparty(req,res,function(err){
		if(err){
			next(err);
			return;
		}
		function reqFileToRenameDTO(f){
			var segments = f.originalFilename.split('.');
			var ext = segments.length>1 ? segments[1] : '';
			var oldPath = f.path;
			var newFileName = uuid.v1() + '.' + ext;
			var newPath = path.resolve(__dirname + '/../uploads/') + '\\' + newFileName;
			return {
				oldPath:oldPath,
				newPath:newPath,
				name:newFileName
			};
		}
		var files = [];
		var reqFiles = req.files.files;
		var multiple = reqFiles instanceof Array;
		if(multiple){
			files = reqFiles.map(function(f){
									return reqFileToRenameDTO(f);
								});
		}else{
			files.push(reqFileToRenameDTO(reqFiles));
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
				req.body.fileNames = fileNames;
				next();
			}else{
				res.send(500);
			}
		});
	});
};