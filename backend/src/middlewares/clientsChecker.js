async function clientValuesChecker(req, res, next) {
  try {
    const values = ['name', 'birth', 'CPF', 'CNH', 'phone', 'address'];
    const { body } = req;
    const testValues = values.reduce((acc, value) => {
      if (acc) return typeof body[value] === 'string';
    }, true);
    if (!body || !testValues || req.file === undefined) {
      return res.status(406).json({ message: 'incorrect arguments' });
    }
    next();
  } catch (error) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
}

module.exports = { clientValuesChecker };