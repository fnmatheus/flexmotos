const User = require('../database/schemas/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');
const { CreateSystem, GiveCode } = require('./system.service');

async function signUpService({name, password, category}) {
  try {
    const hasSuper = await User.findOne({ category: 'super' });
    if (hasSuper) {
      const {message: code} = await GiveCode();
      const userExists = await User.findOne({ name });
      if(userExists) {
        return { type: 'used', message: 'Already registered user' };
      }
      if(category === 'super') {
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
    }
    return { type: 'NoSuper', message: `Don't has a super` }
  } catch (error) {
    return { type: 'RegistrationError', message: 'Registration Error' };
  }
}

async function signInService({code, name, password}) {
  try {
    const hasSuper = await User.findOne({ category: 'super' });
    if (hasSuper) {
      const user = await User.findOne({ name });
      console.log(user);
      if (user) {
        const validatePassword = await bcrypt.compare(password, user.password).then((res) => res);
        if (!validatePassword) return { type: 'WrongPassword', message: 'Wrong Password' };
        if (code !== user.code) return { type: 'WrongCode', message: 'Wrong Code' };
        await User.updateOne({ name }, { lastTime: Date() });
        const token = generateToken({ category: user.category, name: user.name });
        return { type: null, message: token };
      }
      return { type: 'NotFound', message: 'UserNotFound' }
    }
    const {type, message} = await CreateSystem();
    if (type === 'SystemError') return { type, message };
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      code: message,
      name,
      password: hashedPassword,
      category: 'super',
    });
    return { type, message }
  } catch (error) {
    return { type: 'LoginError', message: 'Login Error' };
  }
}

async function removeService(name) {
  const user = await User.findOne({ name });
  if (!user) return { type: 'notFound', message: 'User not found' };
  if (user.category !== 'super') {
    await User.deleteOne({ name: user.name});
    return { type: null, message: 'User has been removed' };
  }
  return { type: 'super', message: 'User is a super' };
}

async function getAllUserService() {
  const users = await User.find({}, '-password');
  console.log(users);
}

module.exports = { signUpService, signInService, removeService, getAllUserService };