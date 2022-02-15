const mongoose = require('mongoose');

// create an schema
var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  name: String,
  email: String,
  password: String,
});

// var userModel = mongoose.model("users", userSchema);
module.exports = mongoose.model("Users", userSchema);
