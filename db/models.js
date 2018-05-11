const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const templateSchema = mongoose.Schema({
  name: String,
  description: Array,
  options: Array,
});

const Template = mongoose.model('Template', templateSchema);

module.exports = {
  User,
  Template,
};
