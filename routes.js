var main = require('./handlers/main.js');

module.exports = function(app){
	// main routes
	app.get('/', main.home);
};