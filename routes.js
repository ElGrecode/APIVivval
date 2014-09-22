var main   = require('./handlers/main.js'),
	api    = require('./handlers/api.js');

var logger = require('./helpers/logger.js');

module.exports = function(app){
	// main routes
	app.get('/', logger.log, main.home);

	// api middleware first
	app.param('latlng', api.coordinateInformation);
	// api routes
	app.get('/api/heatmap/:api_key/:latlng/:zoom/:searchterm', api.heatmap);
};