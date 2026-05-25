const User = require('../models/User');
const sendResponse = require('../utils/response');

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    return sendResponse(res, 200, true, 'User updated', user);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
};

module.exports = {
  updateUser
};
