const User = require('../database/schemas/User');
const bcrypt = require('bcrypt');

async function SignUpService({code, name, password, category}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await User.findOne({ name });
    if(!userExists) {
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

module.exports = { SignUpService };