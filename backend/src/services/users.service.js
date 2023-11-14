const User = require('../database/schemas/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');

async function SignUpService({code, name, password, category}) {
  try {
    const userExists = await User.findOne({ name });
    if(!userExists) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        code,
        name,
        password: hashedPassword,
        category,
      });
      return { type: 'ok', message: 'User has been registered' };
    }
    return { type: 'used', message: 'Already registered user' }
  } catch (error) {
    return { type: 'Registration Error' }
  }
}

async function SignInService({code, name, password}) {
  const user = await User.findOne({ name });
  if (user) {
    const validatePassword = await bcrypt.compare(password, user.password).then((res) => res);
    if (!validatePassword) return { type: 'WrongPassword', message: 'Wrong Password' };
    if (code !== user.code) return { type: 'WrongCode', message: 'Wrong Code' };
    const token = generateToken({ category: user.category, name: user.name });
    return { token };
  }
  return { type: 'NotFound', message: 'UserNotFound' }
}

module.exports = { SignUpService, SignInService };