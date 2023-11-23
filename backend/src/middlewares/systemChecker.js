async function valueParamChecker(req, res, next) {
  const { body } = req;
  if (typeof body.value !== 'number') {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

module.exports = { valueParamChecker };