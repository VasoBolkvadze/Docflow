var eventStore = require('../../eventstore')('http://localhost:2113/',['admin','changeit']);
var mockdb = require('../../utils/mockdb');

function renderCrspdsListView(req,res){
	var model = {
		crspds: mockdb.crspds.find.all()
	};
	res.render('crspds/list',model);
}
function renderNewCrspdView(req,res){
	res.render('crspds/new');
}
function renderCrspdDetailView(req,res){
	var model = {
		crspd: mockdb.crspds.find.byId(req.params.id)
	};
	res.render('crspds/detail', model);
}
function createCrspd(req,res){
	var settings = {
		eventType:'ShemovidaKorespondencia',
		data:{
			sender:req.body.sender,
			dateSent:req.body.dateSent,
			tags:req.body.tags,
			content:req.body.content,
			fileNames:req.body.fileNames
		}
	};
	eventStore.appendToStream('korespondenciebi'
		, settings
		, function(err,result){
			if(!err)
				res.redirect('/crspds');
			else
				res.send(err,500);
		});
}
module.exports = {
	views:{
		list:renderCrspdsListView,
		'new':renderNewCrspdView,
		detail:renderCrspdDetailView
	},
	api:{
		create:createCrspd
	}
};