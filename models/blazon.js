var mongoose = require('mongoose');

var blazeSchema = mongoose.Schema({
  id: Number,
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
  