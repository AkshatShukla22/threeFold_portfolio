// testimonials.routes.js
const express = require('express');
const router = express.Router();
const { getTestimonials, getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonials.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getTestimonials);
router.get('/:id', getTestimonial);
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
