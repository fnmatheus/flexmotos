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
  origin: 'http://localhost:3001',
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
// .connect(process.env.MONGODB_URI)
.connect('mongodb://localhost:27017')
.then(() => {
  // app.listen(process.env.PORT, () => {
  app.listen(3000, () => {
    // console.log(`Database connected! Listen on ${process.env.PORT}`);
    console.log(`Database connected! Listen on ${3000}`);
    schedule.dailyUpdate();
    schedule.weeklyUpdate();
    schedule.monthlyUpdate();
    schedule.yearlyUpdate();
  })
})
.catch((err) => console.log(err));
