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
    const {query} = req;
    if (!query.status) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function vehicleModelChecker(req, res, next) {
  try {
    const {query} = req;
    if (!query.model) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function vehiclePlateChecker(req, res, next) {
  try {
    const {query} = req;
    if (!query.plate) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

async function vehicleBodyPlateChecker(req, res, next) {
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
    const {CPF, name, rentalDate, returnDate, plate, hasSecurity, rentValue, securityValue} = req.body;
    const verifyType = (
      typeof CPF === 'string' ||
      typeof name === 'string' ||
      typeof rentalDate === 'string' ||
      typeof returnDate === 'string' ||
      typeof plate === 'string' ||
      typeof hasSecurity === 'boolean' ||
      typeof rentValue > 0 ||
      typeof securityValue > 0
    );
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
    if (!CPF || !plate) {
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
  vehicleBodyPlateChecker,
  vehicleUpdateChecker,
  rentVehicleChecker,
  returnVehicleChecker,
};