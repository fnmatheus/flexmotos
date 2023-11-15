const System = require('../database/schemas/System');

async function CreateSystem() {
  try {
    const code = Math.floor(Math.random() * 9000 + 1000);
    const year = new Date().getFullYear();
    await System.create({
      code,
      billing: {
        years: {
          [year]: []
        },
        today: 0,
        goal: 0,
      }
    });
    return { type: 'SystemCreated', message: code }
  } catch (error) {
    return { type: 'SystemError', message: `Can't create a system` }
  }
}

async function GiveCode() {}

module.exports = { CreateSystem };