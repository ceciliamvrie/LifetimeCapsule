const mongoose = require('mongoose');
const User = require('../models/user.js');
const Capsule = require('../models/capsule.js');
const uri = 'mongodb://localhost/lifetimecapsule';

mongoose.connect(uri);

mongoose.connection.on('connected', () => {
  console.log('Connected to', uri);
});

mongoose.connection.on('error', () => {
  console.log('Mongoose default connection error:', err);
})
