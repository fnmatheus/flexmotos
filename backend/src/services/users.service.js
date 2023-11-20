const User = require('../database/schemas/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');
const { createSystem, giveCode } = require('./system.service');

async function signUp({name, password, category}) {
  try {
    const hasSuper = await User.findOne({ category: 'super' });
    if (hasSuper) {
      const {message: code} = await giveCode();
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

async function signIn({code, name, password}) {
  try {
    const hasSuper = await User.findOne({ category: 'super' });
    if (hasSuper) {
      const user = await User.findOne({ name });
      if (user) {
        const validatePassword = await bcrypt.compare(password, user.password).then((res) => res);
        if (!validatePassword) return { type: 'WrongPassword', message: 'Wrong Password' };
        if (code !== user.code) return { type: 'WrongCode', message: 'Wrong Code' };
        await User.updateOne({ name }, { lastTime: Date() });
        const token = generateToken({ category: user.category, name: user.name, code });
        return { type: null, message: token };
      }
      return { type: 'NotFound', message: 'User not Found' }
    }
    const {type, message} = await createSystem();
    if (type === 'SystemError') return { type, message };
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      code: message,
      name,
      password: hashedPassword,
      category: 'super',
    });
    return { type, message };
  } catch (error) {
    return { type: 'LoginError', message: 'Login Error' };
  }
}

async function remove(name) {
  try {
    const user = await User.findOne({ name });
    if (!user) return { type: 'notFound', message: 'User not found' };
    if (user.category !== 'super') {
      await User.deleteOne({ name: user.name});
      return { type: null, message: 'User has been removed' };
    }
    return { type: 'super', message: 'User is a super' };
  } catch (error) {
    return { type: 'RemoveUserError', message: 'Remove User Error' };
  }
}

async function getAll() {
  try {
    const users = await User.find({}, '-password');
    return { type: null, message: users };
  } catch (error) {
    return { type: 'UsersError', message: `Can't access to give users` };
  }
}

async function update({name, password, category}) {
  try {
    const user = await User.findOne({ name });
    if (!user) return { type: 'notFound', message: 'User not found' };
    if (category === 'super') return {type: 'super', message: `Users can't be a super`}
    if (!password) {
      await User.findOneAndUpdate({name}, {
        category,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate({name}, {
        password: hashedPassword,
        category,
      });
    }
    return {type: null, message: `${name} updated`};
  } catch (error) {
    return {type: 'UpdateError', message: `Can't access to update users`};
  }
}

async function getByCategory(category) {
  try {
    const users = await User.find({category}, '-password');
    return { type: null, message: users };
  } catch (error) {
    return { type: 'UsersError', message: `Can't access to give users` };
  }
}

async function getByName(name) {
  try {
    const users = await User.find({name: { "$regex": name, "$options": "i" }}, '-password');
    return { type: null, message: users };
  } catch (error) {
    return { type: 'UsersError', message: `Can't access to give users` };
  }
}

module.exports = {
  signUp,
  signIn,
  remove,
  getAll,
  update,
  getByCategory,
  getByName
};