const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const usersRoutes = require('./routes/users.routes');
const systemRoutes = require('./routes/system.routes');
const clientsRoutes = require('./routes/clients.routes');
const vehiclesRoutes = require('./routes/vehicles.routes');
const { checkToken } = require('./middlewares/tokenChecker');
const schedule = require('./config/schedule');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: process.env.FRONTEND_URI,
  methods: 'GET, POST, DELETE'
}));

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
    schedule.dailyUpdate();
    schedule.weeklyUpdate();
    schedule.monthlyUpdate();
    schedule.yearlyUpdate();
  })
})
.catch((err) => console.log(err));
