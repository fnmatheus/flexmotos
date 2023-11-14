const jwt = require('jsonwebtoken');

const secret = 'jwtsecret';

const generateToken = (payload) => {
  const token = jwt.sign(
    payload,
    secret,
    {
      algorithm: 'HS256',
      expiresIn: '1d',
    },
  );
  return token;
};

const validateToken = (token) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch {
    return false;
  }
};

module.exports = { generateToken, validateToken }