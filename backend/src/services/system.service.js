const System = require('../database/schemas/System');
const crypto = require('crypto');
const createPdf = require('./utils/pdf');

async function createSystem() {
  try {
    const byteArray = new Uint16Array(1);
    const code = crypto.getRandomValues(byteArray)[0];
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
        contractCounter: 1,
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
    console.log('Billing Updated!');
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

async function changeContractCounter(pdfInfo) {
  try {
    await createPdf(pdfInfo);
    const systems = await System.find();
    const system = systems[0];
    const billing = system.billing;
    await System.findOneAndUpdate({ code: system.code }, {
      billing: {
        ...billing,
        contractCounter: billing.contractCounter + 1
      }
    });
    return { type: null, message: 'Contract counter updated' };
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

async function setTrafficTicketValue(value) {
  try {
    const systems = await System.find();
    const system = systems[0];
    const billing = system.billing;
    await System.findOneAndUpdate({ code: system.code }, {
      billing: {
        ...billing,
        trafficTicketValue: value
      }
    });
    return { type: null, message: 'Traffic ticket value was set' };
  } catch (error) {
    return { type: 'System Error', message: `Can't access the system` };
  }
}

async function setFuelValue(value) {
  try {
    const systems = await System.find();
    const system = systems[0];
    const billing = system.billing;
    await System.findOneAndUpdate({ code: system.code }, {
      billing: {
        ...billing,
        fuelValue: value
      }
    });
    return { type: null, message: 'Fuel value was set' };
  } catch (error) {
    return { type: 'System Error', message: `Can't access the system` };
  }
}

async function setCleanValue(value) {
  try {
    const systems = await System.find();
    const system = systems[0];
    const billing = system.billing;
    await System.findOneAndUpdate({ code: system.code }, {
      billing: {
        ...billing,
        cleanValue: value
      }
    });
    return { type: null, message: 'Clean value was set' };
  } catch (error) {
    return { type: 'System Error', message: `Can't access the system` };
  }
}

async function getDashboard() {
  try {
    const systems = await System.find();
    const billing = systems[0].billing;
    const {trafficTicketValue, fuelValue, cleanValue, today, goal, contractCounter} = billing;
    const thisMonth = billing.years[billing.currentYear][billing.currentMonth];
    const monthSum = thisMonth.reduce((acc, value) => acc + value, 0);
    const dashboard = {
      today,
      goal,
      month: monthSum,
      trafficTicketValue,
      fuelValue,
      cleanValue,
      contractCounter,
    };
    return { type: null, message: dashboard };
  } catch (error) {
    return { type: 'System Error', message: `Can't access the system` };
  }
}

async function getYearBilling(year) {
  try {
    const systems = await System.find();
    const billing = Object.values(systems[0].billing.years[year]);
    const years = Object.keys((systems[0].billing.years));
    const sumBilling = billing.map((month) => month.reduce((acc, value) => acc + value, 0));
    return { type: null, message: { years, billing: sumBilling } };
  } catch (error) {
    return { type: 'System Error', message: `Can't access the system` };
  }
}

module.exports = {
  createSystem,
  giveCode,
  dailyBillingUpdate,
  changeToday,
  changeContractCounter,
  setGoal,
  getDashboard,
  getYearBilling,
  setTrafficTicketValue,
  setFuelValue,
  setCleanValue
};