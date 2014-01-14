function renderLoginView(req,res){
	res.render('login',{ message: req.flash('error') });
}
function postLogin(req, res) {
	res.redirect('/');
}
function postLogout(req, res){
	req.logOut();
	res.redirect('/login');
}
module.exports = {
	views:{
		login:renderLoginView
	},
	api:{
		login:postLogin,
		logout:postLogout
	}
};