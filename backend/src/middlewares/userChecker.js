async function signUpChecker(req, res, next) {
  const { body } = req;
  const validation = (typeof body.name === 'string' || typeof body.password === 'string' || typeof body.category === 'string');
  if (!validation) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

async function signInChecker(req, res, next) {
  const { body } = req;
  const validation = (typeof body.code === 'number' || typeof body.name === 'string' || typeof body.password === 'string');
  if (!validation) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

async function updateChecker(req, res, next) {
  const { body } = req;
  const validation = (typeof body.name === 'string' || typeof body.category === 'string');
  if (!validation) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

module.exports = { signUpChecker, signInChecker, updateChecker };