const User = require('../models/User');
const sendResponse = require('../utils/response');

const AdminCredentials = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
}
const signup = async (req, res) => {
  try {
    const { name, email, password, phone, bloodGroup, city, role, available } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendResponse(res, 400, false, 'Email already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      bloodGroup,
      city,
      role,
      available
    });

    return sendResponse(res, 201, true, 'Signup successful', user);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(email === AdminCredentials.email && password === AdminCredentials.password) {
      return sendResponse(res, 200, true, 'Admin login successful', {
        email,
        role: 'admin'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    if (user.password !== password) {
      return sendResponse(res, 401, false, 'Invalid password');
    }

    return sendResponse(res, 200, true, 'Login successful', user);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  signup,
  login
};
