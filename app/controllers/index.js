function getIndexView(req,res){
	res.redirect('/crspds');
}
module.exports = {
	views:{
		index:getIndexView
	}
};