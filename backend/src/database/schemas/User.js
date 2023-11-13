const mongoose = require('mongoose');

const User = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
    unique:true,
  },
  code: {
    type: Number,
    require: true,
    unique:true,
  },
  name: {
    type: String,
    require: true,
    unique:true,
  },
  password: {
    type: String,
    require: true,
    unique:true,
  },
  category: {
    type: String,
    require: true,
    unique:true,
  },
  lastTime: {
    type: Date,
    default: Date.now,
    require: true,
    unique:true,
  },
});

export default mongoose.model('User', User)