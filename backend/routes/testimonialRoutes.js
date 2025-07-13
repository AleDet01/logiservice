const express = require('express');
const router = express.Router();
const controller = require('../controllers/testimonialController');
const auth = require('../middleware/auth');

router.post('/', auth(), controller.createTestimonial);
router.get('/', controller.getTestimonials);

module.exports = router;
