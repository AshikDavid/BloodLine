const Donation = require('../models/Donation');
const sendResponse = require('../utils/response');

const createDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    const populatedDonation = await donation.populate(['donorId', 'requestId']);
    return sendResponse(res, 201, true, 'Donation created', populatedDonation);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
};

const getDonations = async (req, res) => {
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

const getDonationsByUser = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.params.donorId })
      .populate('donorId')
      .populate('requestId')
      .sort({ createdAt: -1 });

    return sendResponse(res, 200, true, 'User donations fetched', donations);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  createDonation,
  getDonations,
  getDonationsByUser
};
