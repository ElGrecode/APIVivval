var main   = require('./handlers/main.js'),
	api    = require('./handlers/api.js');

var logger = require('./helpers/logger.js');

module.exports = function(app){
	// main routes
	app.get('/', logger.log, main.home);

	// api middleware first
	// app.param('latlng', api.coordinateInformation);

	// api routes
	app.get('/api/heatmap/:apiKey/:latlng/:zoom/:searchterm', api.heatmap);
    app.get('/api/blaze', api.blaze);
    app.post('/api/blaze', api.blazePost);
};