var Blazon = require('../models/blazon.js');

exports.coordinateInformation = function(req, res, next, name){
	req.latlng = 'Lat and Lng manipulated by middleware first' + name;
	next();
};

exports.heatmap = function(req, res){
	// An example of some data we could possibly be getting back
	res.json({
		name: 'heatmap',
		api_key: req.params.api_key,
		blazon_count: 414,
		distribution: "This is potentially a map distribution {} for the heatmap and would be computed prior to hitting the mobile device",
		blazons: 
			[{
				coordinates: [34.01204, -118.125151],
				text: "Amazing ^shoe deal at ^Nordstroms right now",
				bumps: ["shoe", "Nordstroms"],
				kindles: 16
			},
			{
				coordinates: [34.01504, -118.155350],
				text: "Crazy scene at the ^chess park, ^AdamSchuld is filming for ^StorageWars",
				bumps: ["chess", "AdamSchuld", "StorageWars"],
				kindles: 24
			}],
		hello: 		'hello there',
		latlng:  	req.latlng, // Being manipulated by coordinateInformation() Middleware
		zoom: 		req.params.zoom,
		searchterm: req.params.searchterm
	});
	
};

exports.blaze = function(req, res){
  res.render('blaze');
};

exports.blazePost = function(req, res){
  var uid = req.body.uid;
  var geolocation = {lat: req.body.lat, lng: req.body.lng};
  var text = req.body.text;
  // var bumpString = req.body.bumps
  

  // Do some validations

  // Create Blazon object
  var blazeObj = new Blazon({
    uid: uid,
    geolocation: geolocation,
    text: text,
    kindles: 0
  });
  // Extract the bumps using the blazon model method
  blazeObj.bumps = blazeObj.extractBumps(text);

  // Save the Blazon
  blazeObj.save();


};
