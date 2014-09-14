var express     = require('express'),
	app  		= express();

// set up handlebars view engine
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

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);



// Eventual Middleware


// Routes
require('./routes.js')(app);

app.listen(3000, function(){
	console.log('Listening on port 3000');
})