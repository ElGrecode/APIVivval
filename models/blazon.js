var mongoose = require('mongoose');

// exports.saveBlaze = function(blazeObj){

// }

var blazeSchema = mongoose.Schema({
  uid: Number,
  geolocation: {
    lat: Number,
    lng: Number
  },
  text: String,
  bumps: [{text: String}],
  kindles: Number
});

var Blaze = mongoose.model('Blaze', blazeSchema);
module.exports = Blaze;
  