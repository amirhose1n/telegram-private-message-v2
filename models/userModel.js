const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  uid: Number,
});

const user = mongoose.model('users', userSchema);
module.exports = user;
