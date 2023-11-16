const mongoose = require('mongoose');

const Client = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  birth: {
    type: String,
    require: true,
  },
  CPF: {
    type: String,
    require: true,
    unique:true,
  },
  CNH: {
    type: String,
    require: true,
    unique:true,
  },
  phone: {
    type: String,
    require: true,
  },
  adress: {
    type: String,
    require: true,
  },
  proof: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  history: [{
    type: String,
  }],
  securities: [{
    type: Array,
  }],
});

module.exports = mongoose.model('Client', Client)