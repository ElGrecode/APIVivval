var express     = require('express'),
	bodyParser	= require('body-parser'), // Parses the body of our HTTP requests
	credentials = require('./credentials.js'),
    app  		= express();
    

// Models
var User        = require('./models/user.js'),
    Blaze       = require('./models/blazon.js');
    
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
app.set('env', 'development'); 
// allow caching of unchanged templates
app.enable('view cache');
// disable express header information
app.disable('x-powered-by');

// Database
var mongoose = require('mongoose');
var options = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
switch(app.get('env')){
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, options);
        break;
    case 'production':
        // todo: Set up for Deployment
        // Would have to set up for production
        // mongoose.connect(credentials.mongo.production.connectionsString, options);
        mongoose.connect(credentials.mongo.production.connectionString, options);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

// *** Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

// *** Routes
require('./routes.js')(app);

// *** Catch-all Handlers
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500);
    res.render('500');
});

// *** Start the Server Up
app.listen(3000, function(){
	console.log('Listening on port 3000');
})