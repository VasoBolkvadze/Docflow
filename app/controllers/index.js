function renderIndexView(req,res){
	res.redirect('/crspds');
}
module.exports = {
	views:{
		index:renderIndexView
	}
};