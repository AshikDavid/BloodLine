const User = require('../models/User');
const BloodRequest = require('../models/BloodRequest');
const Donation = require('../models/Donation');
const sendResponse = require('../utils/response');

const getDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalDonors,
      totalRequests,
      openRequests,
      completedRequests,
      totalDonations
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'donor' }),
      BloodRequest.countDocuments(),
      BloodRequest.countDocuments({ status: 'open' }),
      BloodRequest.countDocuments({ status: 'completed' }),
      Donation.countDocuments()
    ]);

    return sendResponse(res, 200, true, 'Dashboard data fetched', {
      totalUsers,
      totalDonors,
      totalRequests,
      openRequests,
      completedRequests,
      totalDonations
    });
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Users fetched', users);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const getAdminRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Blood requests fetched', requests);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const getAdminDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donorId')
      .populate('requestId')
      .sort({ createdAt: -1 });

    return sendResponse(res, 200, true, 'Donations fetched', donations);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const deleteAdminUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return sendResponse(res, 404, false, 'User not found');
    }

    return sendResponse(res, 200, true, 'User deleted', user);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const deleteAdminRequest = async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.findByIdAndDelete(req.params.id);

    if (!bloodRequest) {
      return sendResponse(res, 404, false, 'Blood request not found');
    }

    return sendResponse(res, 200, true, 'Blood request deleted', bloodRequest);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const deleteAdminDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return sendResponse(res, 404, false, 'Donation not found');
    }

    return sendResponse(res, 200, true, 'Donation deleted', donation);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  getDashboard,
  getAdminUsers,
  getAdminRequests,
  getAdminDonations,
  deleteAdminUser,
  deleteAdminRequest,
  deleteAdminDonation
};
