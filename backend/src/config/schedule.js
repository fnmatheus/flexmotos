const schedule = require('node-schedule');
const { dailyBillingUpdate } = require('../services/system.service');
const { IPVAsYearlyUpdate, oilChangeWeeklyUpdate } = require('../services/vehicles.service');

async function schedules() {
  schedule.scheduleJob('0 5 0 * * *', () => dailyBillingUpdate());
  schedule.scheduleJob('0 0 0 1 1 *', () => IPVAsYearlyUpdate());
  schedule.scheduleJob('0 0 0 0 * SUN', () => oilChangeWeeklyUpdate());
}

module.exports = schedules;