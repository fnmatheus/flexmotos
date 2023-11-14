const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const UsersRoutes = require('./routes/users.routes');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({msg: 'Flex Motos API'});
});

app.use('/users', UsersRoutes);

mongoose
  .connect('mongodb://localhost:3002/flexmotos')
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connected!');
    })
  })
  .catch((err) => console.log(err));
