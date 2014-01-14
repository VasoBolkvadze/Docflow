var passport = require('passport');
var auth = require('../config/authorization');
var fileUpload = require('../middleware/fileUpload');

var loginCtrl = require('../app/controllers/login');
var crspdsCtrl = require('../app/controllers/crspds');
var indexCtrl = require('../app/controllers/index');

module.exports.setup = function(app){
	app.get('/',auth.ensureAuth, indexCtrl.views.index);
	app.get('/login',loginCtrl.views.login);
	app.post('/api/login',passport.authenticate('local',{ failureRedirect: '/login', failureFlash: true }),loginCtrl.api.login);
	app.post('/api/logout', loginCtrl.api.logout);
	app.get('/crspds', crspdsCtrl.views.list);
	app.get('/crspds/new',crspdsCtrl.views.new);
	app.get('/crspds/:id',crspdsCtrl.views.detail);
	app.post('/api/crspds/create',auth.requiresAuth, fileUpload, crspdsCtrl.api.create);
};