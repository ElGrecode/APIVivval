var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  client_id: String,
  simplePass: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;