var Blazon = require('../models/blazon.js');

exports.heatmap = function(req, res){
  if (req.params.apiKey == "jdfs8A3298Clkp62kH0uf29h29"){ 
    console.log('permission granted');
    var latlngStrArr = req.params.latlng.split(',');
    var latlng = [parseFloat(latlngStrArr[0]), parseFloat(latlngStrArr[1])];
    var zoom = req.params.zoom;
    // todo: determine zoomRadius based on zoom level
    var zoomRadius = .000001; // Here we just hardcode it for the time being
    // todo: incorporate a search term to be searched within query
    var searchTerm = req.params.searchterm.toLowerCase();

    // The radius of our query is determined by the latlng and zoom of the input
    // Let's start by querying +/-.000001 of our latlng


    var query = Blazon.find()
    //.where('geolocation.lat').gt(latlng[0] - zoomRadius).lt(latlng[0] + zoomRadius)
    //.where('geolocation.lng').gt(latlng[1] - zoomRadius).lt(latlng[1] + zoomRadius)
    // These above queries are not necessary for now
    .limit(400)
    .exec(function(err, blazons){
      // default return all results no filter
      if (searchTerm == "all"){
        res.json({
          latlng: latlng,
          searchTerm: searchTerm,  
          zoom: zoom,
          blazons: blazons
        });
      } else { // We filter based on the search term passed in
        var filteredBlazons = [];
        console.log(blazons.length);
        for (var i = 0; i < blazons.length; i++){
          console.log(blazons[i].bumps);
          if (blazons[i].bumps.indexOf(searchTerm) >= 0){
            filteredBlazons.push(blazon[i]);
          }
        }

        res.json({
          latlng: latlng,
          searchTerm: searchTerm,
          zoom: zoom,
          blazons: filteredBlazons
        });
      }


      // create the json data for our API endpoint
      
    });
  } else {
    console.log("You don't have permission to access the API");
    res.redirect('/blaze');
  }
  

	
};

exports.blaze = function(req, res){
  console.log('blaze view');
  res.render('blaze');
};

exports.blazePost = function(req, res){
  var uid = req.body.uid;
  var name = req.body.name;
  var geolocation = {lat: req.body.lat, lng: req.body.lng};
  var text = req.body.text;
  // var bumpString = req.body.bumps
  

  // todo: some validations

  // Create Blazon object
  var blazeObj = new Blazon({
    uid: uid,
    name: name,
    geolocation: geolocation,
    text: text,
    kindles: 0
  });
  // Extract the bumps using the blazon model method
  blazeObj.bumps = blazeObj.extractBumps(text);

  // Save the Blazon
  blazeObj.save();


};
