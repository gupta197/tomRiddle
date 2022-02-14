const mongoose = require('mongoose');
// var Schema = mongoose.Schema();
var Schema = mongoose.Schema

// create an schema
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String,
  name: String,
  email: String,
  password: String,
});

var userModel = mongoose.model("users", userSchema);
module.exports = mongoose.model("Users", userModel);
