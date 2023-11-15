const { changeToday, setGoal } = require('../services/system.service');

async function changeTodayController(req, res) {
  const { value } = req.body;
  const {type, message} = await changeToday(value);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

async function setGoalController(req, res) {
  const { value } = req.body;
  const {type, message} = await setGoal(value);
  if (type) return res.status(500).json(message);
  return res.status(200).json(message);
}

module.exports = {
  changeTodayController,
  setGoalController
}