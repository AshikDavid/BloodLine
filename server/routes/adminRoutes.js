const express = require('express');
const {
  getDashboard,
  getAdminUsers,
  getAdminRequests,
  getAdminDonations,
  deleteAdminUser,
  deleteAdminRequest,
  deleteAdminDonation
} = require('../controllers/adminController');

const router = express.Router();

router.get('/dashboard', getDashboard);
router.get('/users', getAdminUsers);
router.get('/requests', getAdminRequests);
router.get('/donations', getAdminDonations);
router.delete('/users/:id', deleteAdminUser);
router.delete('/requests/:id', deleteAdminRequest);
router.delete('/donations/:id', deleteAdminDonation);

module.exports = router;
