const mongoose = require('mongoose');

const System = new mongoose.Schema({
  code: {
    type: Number,
    require: true,
    unique: true
  },
  billing: {
    years: {},
    today: {
      type: Number,
    },
    goal: {
      type: Number,
    },
  },
});

module.exports = mongoose.model('System', System);