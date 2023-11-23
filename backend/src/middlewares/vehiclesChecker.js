async function vehicleAddChecker(req, res, next) {
  try {
    const {category, model, year, plate, RENAVAM, IPVA, mileage, securityValue, rentValue} = req.body;
    const verifyType = (
      typeof category === 'string' ||
      typeof model === 'string' ||
      typeof year === 'string' ||
      typeof plate === 'string' ||
      typeof RENAVAM === 'string' ||
      typeof IPVA === 'boolean' ||
      typeof mileage === 'number' ||
      typeof securityValue === 'number' ||
      typeof rentValue === 'number');
    if (!verifyType) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function vehicleStatusChecker(req, res, next) {
  try {
    const {body} = req;
    if (typeof body.status !== 'boolean') {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function vehicleModelChecker(req, res, next) {
  try {
    const {body} = req;
    if (typeof body.model !== 'string') {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function vehiclePlateChecker(req, res, next) {
  try {
    const {body} = req;
    if (typeof body.plate !== 'string') {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function vehicleUpdateChecker(req, res, next) {
  try {
    const {model, year, plate, RENAVAM, mileage, securityValue, rentValue} = req.body;
    const verifyType = (
      typeof model === 'string' ||
      typeof year === 'string' ||
      typeof plate === 'string' ||
      typeof RENAVAM === 'string' ||
      typeof mileage === 'number' ||
      typeof securityValue === 'number' ||
      typeof rentValue === 'number');
    if (!verifyType) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function rentVehicleChecker(req, res, next) {
  try {
    const {CPF, name, rentalDate, returnDate, plate, hasSecurite} = req.body;
    const verifyType = (
      typeof CPF === 'string' ||
      typeof name === 'string' ||
      typeof rentalDate === 'string' ||
      typeof returnDate === 'string' ||
      typeof plate === 'string' ||
      typeof hasSecurite === 'boolean');
    if (!verifyType) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function returnVehicleChecker(req, res, next) {
  try {
    const {CPF, plate} = req.body;
    const verifyType = (
      typeof CPF === 'string' ||
      typeof plate === 'string');
    if (!verifyType) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

module.exports = {
  vehicleAddChecker,
  vehicleStatusChecker,
  vehicleModelChecker,
  vehiclePlateChecker,
  vehicleUpdateChecker,
  rentVehicleChecker,
  returnVehicleChecker,
};