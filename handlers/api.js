var Blazon = require('../models/blazon.js');

exports.coordinateInformation = function(req, res, next, name){
	req.latlng = 'Lat and Lng manipulated by middleware first' + name;
	next();
};

exports.heatmap = function(req, res){
  var apiKey = req.params.apiKey;
  var latlngStrArr = req.params.latlng.split(',');
  var latlng = [parseFloat(latlngStrArr[0]), parseFloat(latlngStrArr[1])];
  var zoom = req.params.zoom;
  // todo: determine zoomRadius based on zoom level
  var zoomRadius = .000001; // Here we just hardcode it for the time being
  // todo: incorporate a search term to be searched within query
  var searchterm = req.params.searchterm;

  // The radius of our query is determined by the latlng and zoom of the input
  // Let's start by querying +/-.000001 of our latlng


  var query = Blazon.find()
  .where('geolocation.lat').gt(latlng[0] - zoomRadius).lt(latlng[0] + zoomRadius)
  .where('geolocation.lng').gt(latlng[1] - zoomRadius).lt(latlng[1] + zoomRadius)
  .limit(400)
  .exec(function(err, blazons){
    // create the json data for our API endpoint
    res.json({
      latlng: latlng,
      searchTerm: searchterm,  
      zoom: zoom,
      blazons: blazons,
    });
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
