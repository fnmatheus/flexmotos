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
    currentMonth: Number,
    currentYear: Number,
    contractCounter: {
      type: Number,
      default: 1,
    },
    trafficTicketValue: {
      type: Number,
      default: 0,
    },
    fuelValue: {
      type: Number,
      default: 0,
    },
    cleanValue: {
      type: Number,
      default: 0,
    },
    goal: {
      type: Number,
    },
  },
});

module.exports = mongoose.model('System', System);