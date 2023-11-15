const { validateToken } = require('../utils/auth');

async function checkToken(req, res, next) {
  const { authorization } = req.headers;
  const token = validateToken(authorization);
  if (!token) return res.status(401).json({message: 'Token is invalid'});
  next();
}

async function checkUserRole(req, res, next) {
  const { authorization } = req.headers;
  const { name } = req.body;
  const token = validateToken(authorization);
  if ((name !== token.name && token.category !== 'super' && token.category !== 'admin') || !token) {
    return res.status(401).json({message: `User don't have permission`});
  }
  next();
}

module.exports = { checkToken, checkUserRole };