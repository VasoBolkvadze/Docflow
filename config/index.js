var middleware = require('./middleware');
var routes = require('./routes');
module.exports = function(app){
	middleware.setup(app);
	routes.setup(app);
};