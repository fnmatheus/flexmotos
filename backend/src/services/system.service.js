const System = require('../database/schemas/System');

async function createSystem() {
  try {
    const code = Math.floor(Math.random() * 9000 + 1000);
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    await System.create({
      code,
      billing: {
        years: {
          [year]: {
            [month]: [],
          }
        },
        currentMonth: month,
        currentYear: year,
        today: 0,
        goal: 0,
      }
    });
    return { type: 'SystemCreated', message: code }
  } catch (error) {
    return { type: 'SystemError', message: `Can't create a system` }
  }
}

async function giveCode() {
  try {
    const systems = await System.find({}, '-billing');
    const { code } = systems[0];
    return { type: 'SystemCode', message: code };
  } catch (error) {
    return { type: 'SystemError', message: `Can't read a system` }
  }
}

async function checkCurrentYear() {
  const systems = await System.find();
  const system = systems[0];
  const billing = system.billing;
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  if (billing.currentYear !== year) {
    await System.findOneAndUpdate({ code: system.code }, {
      billing: {
        ...billing,
        years: {
          ...billing.years,
          [year]: {
            [month]: [],
          }
        },
        currentYear: year,
        currentMonth: month,
      }
    });
  }
}

async function checkCurrentMonth() {
  const systems = await System.find();
  const system = systems[0];
  const billing = system.billing;
  const month = new Date().getMonth();
  if (billing.currentMonth !== month) {
    await System.findOneAndUpdate({ code: system.code }, {
      billing: {
        ...billing,
        years: {
          ...billing.years,
          [billing.currentYear]: {
            ...billing.years[billing.currentYear],
            [month]: [],
          }
        },
        currentMonth: month,
      }
    });
  }
}

async function updateBilling() {
  const systems = await System.find();
  const system = systems[0];
  const billing = system.billing;
  await System.findOneAndUpdate({ code: system.code }, {
    billing: {
      ...billing,
      years: {
        ...billing.years,
        [billing.currentYear]: {
          ...billing.years[billing.currentYear],
          [billing.currentMonth]: [
            ...billing.years[billing.currentYear][billing.currentMonth],
            billing.today,
          ],
        }
      },
      today: 0
    }
  });
}

async function dailyBillingUpdate() {
  try {
    await updateBilling();
    await checkCurrentYear();
    await checkCurrentMonth();
  } catch (error) {
    console.log('System not created');
  }
}

async function changeToday(value) {
  try { 
    const systems = await System.find();
    const system = systems[0];
    const billing = system.billing;
    await System.findOneAndUpdate({ code: system.code }, {
      billing: {
        ...billing,
        today: billing.today + value
      }
    });
    return { type: null, message: 'Today updated' };
  } catch (error) {
    return { type: 'System Error', message: `Can't access the system` };
  }
}

async function setGoal(value) {
  try {
    const systems = await System.find();
    const system = systems[0];
    const billing = system.billing;
    await System.findOneAndUpdate({ code: system.code }, {
      billing: {
        ...billing,
        goal: value
      }
    });
    return { type: null, message: 'Goal was set' };
  } catch (error) {
    return { type: 'System Error', message: `Can't access the system` };
  }
}

module.exports = {
  createSystem,
  giveCode,
  dailyBillingUpdate,
  changeToday,
  setGoal
};