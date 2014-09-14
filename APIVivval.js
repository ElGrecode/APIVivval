var express     = require('express'),
	bodyParser	= require('body-parser'), // Parses the body of our HTTP requests
	app  		= express();
	
// Sets up Handlebars as template engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

// *** Configuration Options
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.set('env', 'devlopment'); 
// allow caching of unchanged templates
app.enable('view cache');
// disable express header information
app.disable('x-powered-by');

// Potentially might want to set JSON settings
// sends JSON back as callback
// app.set('jsonp callback name', 'cb');
// replace certain values in json to protect information
// app.set('json replacer', function(){})



// *** Middleware
// app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

// *** Routes
require('./routes.js')(app);


// *** Start the Server Up
app.listen(3000, function(){
	console.log('Listening on port 3000');
})