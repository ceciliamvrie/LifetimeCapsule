const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SALT_FACTOR = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  let user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(inputPassword, cb) {
  bcrypt.compare(inputPassword, this.password, function(err, matches) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, matches);
    }
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
