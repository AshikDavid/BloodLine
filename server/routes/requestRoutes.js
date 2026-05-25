const express = require('express');
const {
  createRequest,
  getRequests,
  updateRequestStatus,
  getOpenRequests
} = require('../controllers/requestController');

const router = express.Router();

router.post('/', createRequest);
router.get('/', getRequests);
router.get('/open', getOpenRequests);
router.patch('/:id/status', updateRequestStatus);

module.exports = router;
