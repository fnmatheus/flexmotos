async function signUpChecker(req, res, next) {
  const { body } = req;
  if (!body || !body.name || !body.password || !body.category) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

async function signInChecker(req, res, next) {
  const { body } = req;
  if (!body || !body.code || !body.name || !body.password) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

async function updateChecker(req, res, next) {
  const { body } = req;
  if (!body || !body.name || !body.category) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

module.exports = { signUpChecker, signInChecker, updateChecker };