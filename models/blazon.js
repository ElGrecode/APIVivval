var mongoose = require('mongoose');

var blazonSchema = mongoose.Schema({
  uid: Number,
  name: String,
  geolocation: {
    lat: Number,
    lng: Number
  },
  text: String,
  bumps: [String],
  kindles: Number
});

function getIndexPairs(text){
    var indices = [];
    for (i = 0; i < text.length; i++){
       if(text[i] == '^'){
           var startIndex = endIndex = i + 1;
            
           for (j = endIndex; j < text.length; j++){
               endIndex = j;
               if (text[j] == ' ') break;
           }
           
           indices.push([startIndex, endIndex])
        } 
    }
    return indices;
}

function bumpSubstrings(indices, text){
    bumps = [];
    for (i = 0; i < indices.length; i++){
        // Use indices to extract substrings from text
        bumps.push(text.substring(indices[i][0], indices[i][1]));    
    }
    return bumps;
}

blazonSchema.methods.extractBumps = function(text){
  // Add an extra space to text to account for end case
    text += " ";
    // Get Index Pairs
    var indices = getIndexPairs(text);
    // Get Bumps
    var bumps = bumpSubstrings(indices, text);
    return bumps;
}

var Blazon = mongoose.model('Blazon', blazonSchema);
module.exports = Blazon;
  