async function changeTodayChecker(req, res, next) {
  const { body } = req;
  if (!body || typeof body.value !== 'number') {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

module.exports = { changeTodayChecker };