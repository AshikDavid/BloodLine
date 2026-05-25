const BloodRequest = require('../models/BloodRequest');
const sendResponse = require('../utils/response');

const allowedStatuses = ['open', 'approved', 'completed', 'rejected'];

const createRequest = async (req, res) => {
  try {
    const bloodRequest = await BloodRequest.create(req.body);
    return sendResponse(res, 201, true, 'Blood request created', bloodRequest);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Blood requests fetched', requests);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return sendResponse(res, 400, false, 'Invalid request status');
    }

    const bloodRequest = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!bloodRequest) {
      return sendResponse(res, 404, false, 'Blood request not found');
    }

    return sendResponse(res, 200, true, 'Blood request status updated', bloodRequest);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
};

const getOpenRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: 'open' }).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, 'Open blood requests fetched', requests);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  createRequest,
  getRequests,
  updateRequestStatus,
  getOpenRequests
};
