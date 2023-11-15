const mongoose = require('mongoose');

const User = new mongoose.Schema({
  code: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
    unique:true,
  },
  password: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  lastTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', User);