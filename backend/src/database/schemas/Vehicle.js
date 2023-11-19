const mongoose = require('mongoose');

const Vehicle = new mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  plate: {
    type: String,
    require: true,
    unique: true,
  },
  RENAVAM: {
    type: String,
    require: true,
  },
  IPVA: {
    type: Boolean,
    require: true,
  },
  mileage: {
    type: Number,
    require: true,
  },
  rent:{
    status: {
      type: Boolean,
      default: false,
    },
    CPF: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    rental: {
      type: String,
      default: '',
    },
    return: {
      type: String,
      default: '',
    },
  },
  securityValue: {
    type: Number,
    require: true,
  },
  rentValue: {
    type: Number,
    require: true,
  },
  oil: {
    type: Boolean,
    default: true,
  },
  amount: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Vehicle', Vehicle);