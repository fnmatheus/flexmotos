const { validateToken } = require('../utils/auth')

async function checkToken(req, res, next) {
  const { body } = req;
  if (!body || !body.name) {
    return res.status(406).json({ message: 'incorrect arguments' });
  }
  next();
}

async function checkRoleToDeleteUser(req, res, next) {
  const { authorization } = req.headers;
  const { name } = req.body;
  const token = validateToken(authorization);
  console.log((name !== token.name && (token.category !== 'super' || token.category !== 'admin')) || !token);
  if ((name !== token.name && token.category !== 'super' && token.category !== 'admin') || !token) {
    return res.status(401).json({message: `User don't have permission`});
  }
  next();
}

module.exports = { checkToken, checkRoleToDeleteUser };