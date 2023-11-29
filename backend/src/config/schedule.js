const schedule = require('node-schedule');
const { dailyBillingUpdate } = require('../services/system.service');
const { IPVAsYearlyUpdate, oilChangeWeeklyUpdate, amountsMonthlysUpdate } = require('../services/vehicles.service');

const scheduler = {
  dailyUpdate: function() {
    schedule.scheduleJob('0 0 4 * * *', () => dailyBillingUpdate());
  },
  weeklyUpdate: function() {
    schedule.scheduleJob('0 0 0 * * 0', () => oilChangeWeeklyUpdate());
  },
  monthlyUpdate: function() {
    schedule.scheduleJob('0 0 0 1 * *', () => amountsMonthlysUpdate());
  },
  yearlyUpdate: function() {
    schedule.scheduleJob('0 0 0 1 1 *', () => IPVAsYearlyUpdate());
  },
}

module.exports = scheduler;
