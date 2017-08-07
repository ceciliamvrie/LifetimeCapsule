const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ID = Schema.Types.ObjectId;

const userSchema = new Schema({
  id: ID,
  username: String,
  password: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
