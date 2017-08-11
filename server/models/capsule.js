const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.js');

const CapsuleSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  capsuleName: String,
  contents: [],
  buried: Boolean,
  unearthed: Boolean,
  unearthDate: Date,
  createdAt: Date,
  intendedRecipient: String
});

const Capsule = mongoose.model('Capsule', CapsuleSchema);

module.exports = Capsule;
