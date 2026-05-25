const express = require('express');
const {
  createDonation,
  getDonations,
  getDonationsByUser
} = require('../controllers/donationController');

const router = express.Router();

router.post('/', createDonation);
router.get('/', getDonations);
router.get('/user/:donorId', getDonationsByUser);

module.exports = router;
