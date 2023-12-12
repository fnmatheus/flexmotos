const Vehicle = require('../database/schemas/Vehicle');
const { updateClientToRent, updateClientToReturn, getDatails } = require('./clients.service');
const { changeToday } = require('./system.service');
 
async function add({category, model, color, year, plate, RENAVAM, chassis, IPVA, mileage, vehicleValue, securityValue, rentValue}) {
  try {
    await Vehicle.create({
      category,
      model,
      color,
      year,
      plate,
      RENAVAM,
      chassis,
      IPVA,
      mileage,
      vehicleValue,
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
    const vehicles = await Vehicle.find({}, 'rentValue plate model rent');
    const vehiclesInfo = vehicles.map((vehicle) => {
      return {
        rentValue: vehicle.rentValue,
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
        rentValue: vehicle.rentValue,
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
        rentValue: vehicle.rentValue,
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

async function update({category, model, color, year, plate, RENAVAM, chassis, IPVA, mileage, vehicleValue, securityValue, rentValue}) {
  try {
    const vehicle = await Vehicle.findOne({ plate });
    if (!vehicle) return { type: 'notFound', message: 'Vehicle not found' };
    await Vehicle.findOneAndUpdate({plate}, {
      category,
      model,
      color,
      year,
      RENAVAM,
      chassis,
      IPVA,
      mileage,
      vehicleValue,
      securityValue,
      rentValue
    });
    return { type: null, message: 'Vehicle has been updated' };
  } catch (error) {
    return { type: 'UpdateVehicleError', message: `Can't update this vehicle` };
  }
}

async function getVehicleDetails(plate) {
  try {
    const vehicle = await Vehicle.findOne({ plate });
    if (!vehicle) return { type: 'notFound', message: 'Vehicle not found' };
    return { type: null, message: vehicle };
  } catch (error) {
    return { type: 'UpdateVehicleError', message: `Can't update this vehicle` };
  }
}

async function getAllIPVAsToPay() {
  try {
    const vehicles = await Vehicle.find({}, 'model plate IPVA RENAVAM');
    const vehiclesInfo = vehicles.filter((vehicle) => !vehicle.IPVA).map((vehicle) =>{
      return {
        model: vehicle.model,
        plate: vehicle.plate,
        RENAVAM: vehicle.RENAVAM
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

async function amountsMonthlysUpdate() {
  try {
    await Vehicle.updateMany({}, { amount: 0 });
    console.log('Amount monthly update');
  } catch (error) {
    console.log(`Can't do amount update`);
  }
}

async function rentVehicle({CPF, name, rentalDate, returnDate, plate, hasSecurity, rentValue, securityValue}) {
  try {
    const vehicle = await Vehicle.findOne({ plate });
    const {message} = await getDatails(CPF);
    const rentPlates = message.securities.map((securitie) => securitie[0]);
    if (!vehicle) return { type: 'notFound', message: 'Vehicle not found' };
    if (vehicle.rent.status) return { type: 'rented', message: 'This vehicle is not avaliable' };
    if (rentPlates.includes(plate)) return { type: 'invalidPlate', message: 'This plate has a securitie to return' };
    await updateClientToRent({CPF, model: vehicle.model, plate, rentalDate, securityValue, hasSecurity});
    await changeToday(rentValue);
    await Vehicle.findOneAndUpdate({ plate }, {
      rent: {
        status: true,
        CPF,
        name,
        rentalDate,
        returnDate,
      },
      amount: vehicle.amount + rentValue
    });
    return { type: null, message: 'Vehicle has been rented' };
  } catch (error) {
    return { type: 'RentError', message: `Can't rent this Vehicle` };
  }
}

async function returnVehicle({CPF, plate}) {
  try {
    const vehicle = await Vehicle.findOne({ plate });
    if (!vehicle) return { type: 'notFound', message: 'Vehicle not found' };
    await updateClientToReturn(CPF);
    await Vehicle.findOneAndUpdate({ plate }, {
      rent: {
        status: false,
        CPF: '',
        name: '',
        rentalDate: '',
        returnDate: '',
      }
    });
    return { type: null, message: 'Vehicle has been returned' };
  } catch (error) {
    return { type: 'RentError', message: `Can't rent this Vehicle` };
  }
}

module.exports = {
  add,
  getAll,
  getByStatus,
  getByModel,
  remove,
  update,
  getVehicleDetails,
  getAllIPVAsToPay,
  IPVAsYearlyUpdate,
  IPVAUpdate,
  getAllOilChange,
  oilChangeWeeklyUpdate,
  oilUpdate,
  getAllVehiclesToBeReturned,
  amountsMonthlysUpdate,
  rentVehicle,
  returnVehicle,
};