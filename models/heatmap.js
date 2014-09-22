var mongoose = require('mongoose');

var heatmapSchema = mongoose.Schema({
  map_location: {
    lat: Number,
    lng: Number
  },
  blazon_count: Number,
  zoom: Number,
  search_term: String,
  blazons: {}
});

var Heatmap = mongoose.model('Heatmap', heatmapSchema);
module.exports = Heatmap;
