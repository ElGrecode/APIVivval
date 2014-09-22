var Blazon = require('../models/blazon.js');

exports.home = function(req, res){
	res.render('home');
};

exports.blaze = function(req, res){
  res.render('blaze');
};

// function extractBumps(bumpString){
//   var bumps = [];
//   var bumpStringLength = bumpString.length;
//   var indices = [];
//   var startIndex = 0,
//       endIndex = 0;


//   // Loop through the text and finds instances of ^, create indices of matches
//   for (i = 0; i < bumpStringLength; i++){
//     if (bumpString[i] == '^'){
//       startIndex = i;
//       //indices = [{startIndex: 2, endIndex: 10}, {startIndex: 14, endIndex: 22}];
//       for (j = i + 1; j < bumpString.length; j++){
//         if (j = ' '){
//           endIndex = j;
//           var bumpPositions = {startIndex: startIndex, endIndex: endIndex};
//           indices.push(bumpPositions);
//         }  
//       }

//     }

//   }

//   return indices;
// }

exports.blazePost = function(req, res){
  console.log(req.body);
  var uid = req.body.uid;
  var geolocation = {lat: req.body.lat, lng: req.body.lng};
  var text = req.body.text;
  // var bumpString = req.body.bumps
  var bump1 = req.body.bump1;
  var bump2 = req.body.bump2;
  var bump3 = req.body.bump3;

  // Do some validations

  // Saving of Blaze
  // saveBlaze({id: }) etc etc
  var blazeObj = new Blazon({
    uid: uid,
    geolocation: geolocation,
    text: text,
    bumps: [{text: bump1}, {text: bump2}, {text: bump3}],
    kindles: 0
  });
  console.log(blazeObj);
  blazeObj.save(function(err){
    console.log(err);
  });

  // Properly format geolocation and extract bumps

};