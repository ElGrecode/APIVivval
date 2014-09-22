var mongoose = require('mongoose');

var heatmapSchema = mongoose.Schema({
  mapLocation: {
    lat: Number,
    lng: Number
  },
  blazonCount: Number,
  zoom: Number,
  searchTerm: String,
  blazons: {}
});

var Heatmap = mongoose.model('Heatmap', heatmapSchema);
module.exports = Heatmap;
