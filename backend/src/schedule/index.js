const schedule = require('node-schedule');
const { dailyBillingUpdate } = require('../services/system.service');

async function schedules() {
  schedule.scheduleJob('*/2 * * * * *', () => {
    dailyBillingUpdate();
  });
}

module.exports = schedules;