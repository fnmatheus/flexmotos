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

async function GiveCode() {
  try {
    const systems = await System.find({}, '-billing');
    const { code } = systems[0];
    return { type: 'SystemCode', message: code };
  } catch (error) {
    return { type: 'SystemError', message: `Can't read a system` }
  }
}

module.exports = { CreateSystem, GiveCode };