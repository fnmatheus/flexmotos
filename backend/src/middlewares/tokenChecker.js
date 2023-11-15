const { validateToken } = require('../utils/auth');

async function checkToken(req, res, next) {
  const { authorization } = req.headers;
  const token = validateToken(authorization);
  if (!token) return res.status(401).json({message: 'Token is invalid'});
  next();
}

async function checkRole(req, res, next) {
  const { authorization } = req.headers;
  const { name } = req.body;
  const token = validateToken(authorization);
  if (!token) return res.status(401).json({message: `User don't have permission`});
  if (name) {
    if (name !== token.name && token.category !== 'super' && token.category !== 'admin') {
      return res.status(401).json({message: `User don't have permission`});
    }
  }
  if (token.category !== 'super' && token.category !== 'admin') {
    return res.status(401).json({message: `User don't have permission`});
  }
  next();
}

module.exports = { checkToken, checkRole };