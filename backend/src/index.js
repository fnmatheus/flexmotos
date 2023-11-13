const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;
mongoose.connect('mongodb://localhost:27017/flexmotos');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log('server online')
})