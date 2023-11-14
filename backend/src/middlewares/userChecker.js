async function UsersChecker(req, res, next) {
  const { body } = req;
  if (!body || !body.code || !body.name || !body.password || !body.category) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}


module.exports = UsersChecker;