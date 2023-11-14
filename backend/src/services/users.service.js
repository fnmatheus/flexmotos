const User = require('../database/schemas/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');

async function SignUpService({code, name, password, category}) {
  try {
    const userExists = await User.findOne({ name });
    const hasSuper = await User.findOne({ category: 'super' });
    if(userExists) {
      return { type: 'used', message: 'Already registered user' };
    }
    if(hasSuper && category === 'super') {
      return { type: 'super', message: 'Already registered a super' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      code,
      name,
      password: hashedPassword,
      category,
    });
    return { type: null, message: 'User has been registered' };
  } catch (error) {
    return { type: 'RegistrationError', message: 'Registration Error' };
  }
}

async function SignInService({code, name, password}) {
  const user = await User.findOne({ name });
  if (user) {
    const validatePassword = await bcrypt.compare(password, user.password).then((res) => res);
    if (!validatePassword) return { type: 'WrongPassword', message: 'Wrong Password' };
    if (code !== user.code) return { type: 'WrongCode', message: 'Wrong Code' };
    const token = generateToken({ category: user.category, name: user.name });
    return { type: null, message: token };
  }
  return { type: 'NotFound', message: 'UserNotFound' }
}

async function RemoveService(name) {
  const user = await User.findOne({ name });
  if (user.category !== 'super') {
    await User.findByIdAndRemove(user.id);
    return { type: null, message: 'User has been removed' };
  }
  return { type: 'super', message: 'User is a super' };
}

module.exports = { SignUpService, SignInService, RemoveService };