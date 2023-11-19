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
    return { type: 'GetVehicleError', message: `Can't add this vehicle` };
  }
}

async function getByStatus(status) {
  try {
    const vehicles = await Vehicle.find({});
    const vehiclesInfo = vehicles.filter((vehicle) => vehicle.rent.status === status).map((vehicle) =>{
      return {
        category: vehicle.category,
        plate: vehicle.plate,
        model: vehicle.model,
        status: vehicle.rent.status,
      }
    });
    return { type: null, message: vehiclesInfo };
  } catch (error) {
    return { type: 'GetVehicleError', message: `Can't get vehicles by status` };
  }
}

async function getByModel(model) {
  try {
    const vehicles = await Vehicle.find({model: { "$regex": model, "$options": "i" }}, 'category plate model rent');
    const vehiclesInfo = vehicles.map((vehicle) =>{
      return {
        category: vehicle.category,
        plate: vehicle.plate,
        model: vehicle.model,
        status: vehicle.rent.status,
      }
    });
    return { type: null, message: vehiclesInfo };
  } catch (error) {
    return { type: 'GetVehicleError', message: `Can't get vehicles by model` };
  }
}

async function remove(plate) {
  try {
    const vehicle = await Vehicle.findOne({ plate });
    if (!vehicle) return { type: 'notFound', message: 'Vehicle not found' };
    await Vehicle.findOneAndDelete({plate});
    return { type: null, message: 'Vehicle has been removed' };
  } catch (error) {
    return { type: 'RemoveVehicleError', message: `Can't remove this vehicle` };
  }
}

async function getAllIPVAsToPay() {
  try {
    const vehicles = await Vehicle.find({}, 'model plate IPVA');
    const vehiclesInfo = vehicles.filter((vehicle) => !vehicle.IPVA).map((vehicle) =>{
      return {
        model: vehicle.model,
        plate: vehicle.plate,
      }
    });
    return { type: null, message: vehiclesInfo };
  } catch (error) {
    return { type: 'IPVAsError', message: `Can't get all IPVAs to pay` };
  }
}

async function IPVAsYearlyUpdate() {
  try {
    await Vehicle.updateMany({}, { IPVA: false });
    console.log('IPVAs yearly update');
  } catch (error) {
    console.log(`Can't do oil change update`);
  }
}

async function IPVAUpdate(plate) {
  try {
    await Vehicle.findOneAndUpdate({plate}, {IPVA: true});
    return { type: null, message: 'IPVA updated' };
  } catch (error) {
    return { type: 'IPVAError', message: `Can't update this IPVA` };
  }
}

async function getAllOilChange() {
  try {
    const vehicles = await Vehicle.find({}, 'model plate oil');
    const vehiclesInfo = vehicles.filter((vehicle) => !vehicle.oil).map((vehicle) =>{
      return {
        model: vehicle.model,
        plate: vehicle.plate,
      }
    });
    return { type: null, message: vehiclesInfo };
  } catch (error) {
    return { type: 'OilChangeError', message: `Can't get all oil change` };
  }
}

async function oilChangeWeeklyUpdate() {
  try {
    await Vehicle.updateMany({}, { oil: false });
    console.log('Oil change weekly update');
  } catch (error) {
    console.log(`Can't do oil change update`);
  }
}

async function oilUpdate(plate) {
  try {
    await Vehicle.findOneAndUpdate({plate}, {oil: true});
    return { type: null, message: 'Oil updated' };
  } catch (error) {
    return { type: 'OilError', message: `Can't update this oil` };
  }
}

async function getAllVehiclesToBeReturned() {
  try {
    const vehicles = await Vehicle.find({}, 'plate model rent');
    const vehiclesToBeReturned = vehicles.filter((vehicle) => vehicle.rent.status).map((vehicle) => {
      return {
        model: vehicle.model,
        plate: vehicle.plate,
        return: vehicle.rent.return,
      }
    });
    return { type: null, message: vehiclesToBeReturned };
  } catch (error) {
    return { type: 'ToBeReturnedError', message: `Can't get all vehicles to be returned` };
  }
}

module.exports = {
  add,
  getAll,
  getByStatus,
  getByModel,
  remove,
  getAllIPVAsToPay,
  IPVAsYearlyUpdate,
  IPVAUpdate,
  getAllOilChange,
  oilChangeWeeklyUpdate,
  oilUpdate,
  getAllVehiclesToBeReturned,
};