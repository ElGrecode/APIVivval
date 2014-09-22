var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  clientId: String,
  simplePass: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;