const express = require('express');
const router = express.Router();
const controller = require('../controllers/consultationController');

router.post('/', controller.createRequest);
router.get('/', controller.getAllRequests);
router.get('/company-size/:companySize', controller.getRequestsByCompanySize);
router.get('/status/:status', controller.getRequestsByStatus);

module.exports = router;