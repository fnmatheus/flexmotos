const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const usersRoutes = require('./routes/users.routes');
const systemRoutes = require('./routes/system.routes');
const clientsRoutes = require('./routes/clients.routes');
const vehiclesRoutes = require('./routes/vehicles.routes');
const schedules = require('./config/schedule');
const { checkToken } = require('./middlewares/tokenChecker');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: '*',
  methods: 'GET, POST'
}))

app.get('/', (_req, res) => {
  res.status(200).json({msg: 'Flex Motos API'});
});

app.use('/users', usersRoutes);
app.use('/system', systemRoutes);
app.use('/clients', checkToken, clientsRoutes);
app.use('/vehicles', checkToken, vehiclesRoutes);

mongoose
.connect(process.env.MONGODB_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Database connected! Listen on ${process.env.PORT}`);
  })
})
.catch((err) => console.log(err));

schedules();