const mongoose = require('mongoose');

// TODO:  Update these schemas to accurately reflect
// what's actually in the db
const userSchema = mongoose.Schema({
  email: String,
  password: String,
  trainingMaxes: Object,
});

const User = mongoose.model('User', userSchema);

const templateSchema = mongoose.Schema({
  name: String,
  description: Array,
  options: Array,
  variants: Array,
});

const Template = mongoose.model('Template', templateSchema);

module.exports = {
  User,
  Template,
};
