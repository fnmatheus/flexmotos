async function vehicleAddChecker(req, res, next) {
  try {
    const {category, model, year, plate, RENAVAM, IPVA, mileage, securityValue, rentValue} = req.body;
    const verifyType = (
      typeof category !== 'string' ||
      typeof model !== 'string' ||
      typeof year !== 'string' ||
      typeof plate !== 'string' ||
      typeof RENAVAM !== 'string' ||
      typeof IPVA !== 'boolean' ||
      typeof mileage !== 'number' ||
      typeof securityValue !== 'number' ||
      typeof rentValue !== 'number');
    if (verifyType) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

module.exports = { vehicleAddChecker };