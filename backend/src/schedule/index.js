const schedule = require('node-schedule');
const { dailyBillingUpdate } = require('../services/system.service');

async function schedules() {
  schedule.scheduleJob('0 5 0 * * *', () => {
    dailyBillingUpdate();
  });
}

module.exports = schedules;