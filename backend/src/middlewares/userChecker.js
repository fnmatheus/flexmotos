async function SignUpChecker(req, res, next) {
  const { body } = req;
  if (!body || !body.name || !body.password || !body.category) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

async function SignInChecker(req, res, next) {
  const { body } = req;
  if (!body || !body.code || !body.name || !body.password) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

module.exports = { SignUpChecker, SignInChecker };