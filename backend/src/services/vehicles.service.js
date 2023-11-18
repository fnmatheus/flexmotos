const Vehicle = require('../database/schemas/Vehicle');

async function add({category, model, year, plate, RENAVAM, IPVA, mileage, securityValue, rentValue}) {
  try {
    await Vehicle.create({
      category,
      model,
      year,
      plate,
      RENAVAM,
      IPVA,
      mileage,
      securityValue,
      rentValue,
    });
    return { type: null, message: 'Vehicle created' };
  } catch (error) {
    return { type: 'AddVehicleError', message: `Can't add this vehicle` };
  }
}

module.exports = { add };