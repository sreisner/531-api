const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Cycle } = require('./cycle');

const UserSchema = Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  currentCycleId: Schema.Types.ObjectId,
  previousCycleIds: [Schema.Types.ObjectId],
});

module.exports = {
  User: mongoose.model('User', UserSchema),
};
