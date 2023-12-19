const { changeToday, setGoal, getDashboard, getYearBilling, setTrafficTicketValue, setFuelValue, setCleanValue, changeContractCounter } = require('../services/system.service');

async function changeTodayController(req, res) {
  const { value } = req.body;
  const {type, message} = await changeToday(value);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function changeContractCounterController(req, res) {
  const { pdfInfo } = req.body;
  const {type, message} = await changeContractCounter(pdfInfo);
  if (type) return res.status(500).json(message);
  return res.status(200).json('Contract counter changed');
}

async function setGoalController(req, res) {
  const { value } = req.body;
  const {type, message} = await setGoal(value);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function setTrafficTicketValueController(req, res) {
  const { value } = req.body;
  const {type, message} = await setTrafficTicketValue(value);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function setFuelValueController(req, res) {
  const { value } = req.body;
  const {type, message} = await setFuelValue(value);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function setCleanValueController(req, res) {
  const { value } = req.body;
  const {type, message} = await setCleanValue(value);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function getDashboardController(_req, res) {
  const {type, message} = await getDashboard();
  if (type) return res.status(500).json(message);
  res.status(200).json(message);
}

async function getYearBillingController(req, res) {
  const {value} = req.query;
  const {type, message} = await getYearBilling(Number(value));
  if (type) return res.status(500).json(message);
  res.status(200).json(message);
}

module.exports = {
  changeTodayController,
  changeContractCounterController,
  setGoalController,
  getDashboardController,
  getYearBillingController,
  setTrafficTicketValueController,
  setFuelValueController,
  setCleanValueController
}