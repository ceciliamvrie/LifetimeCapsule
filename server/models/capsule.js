const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ID = Schema.Types.ObjectId;

const capsuleSchema = new Schema({
  id: ID,
  userId: ID,
  contents: [],
  inProgress: Boolean,
  unearthed: Boolean,
  unearthDate: Date
});

const Capsule = mongoose.model('capsule', capsuleSchema);

module.exports = Capsule;
