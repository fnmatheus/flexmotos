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

async function getAll() {
  try {
    const vehicles = await Vehicle.find({}, 'category plate model rent');
    const vehiclesInfo = vehicles.map((vehicle) => {
      return {
        category: vehicle.category,
        plate: vehicle.plate,
        model: vehicle.model,
        status: vehicle.rent.status,
      }
    });
    return { type: null, message: vehiclesInfo }
  } catch (error) {
    return { type: 'AddVehicleError', message: `Can't add this vehicle` };
  }
}

module.exports = { add, getAll };