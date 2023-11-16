const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const usersRoutes = require('./routes/users.routes');
const systemRoutes = require('./routes/system.routes');
const clientsRoutes = require('./routes/clients.routes');
const schedules = require('./schedule');

const app = express();

app.use(bodyParser.json())

app.get('/', (_req, res) => {
  res.status(200).json({msg: 'Flex Motos API'});
});

app.use('/users', usersRoutes);
app.use('/system', systemRoutes);
app.use('/clients', clientsRoutes);

mongoose
// .connect(process.env.MONGODB_URI)
.connect('mongodb://localhost:27017')
.then(() => {
  // app.listen(process.env.PORT, () => {
    app.listen(3000, () => {
      console.log('Database connected!');
    })
  })
  .catch((err) => console.log(err));

schedules();