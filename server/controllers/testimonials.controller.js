const Testimonial = require('../models/Testimonial.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: testimonials });
});

const getTestimonial = asyncHandler(async (req, res, next) => {
  const t = await Testimonial.findById(req.params.id);
  if (!t) return next(new AppError('Testimonial not found', 404));
  res.json({ success: true, data: t });
});

const createTestimonial = asyncHandler(async (req, res) => {
  const t = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: t });
});

const updateTestimonial = asyncHandler(async (req, res, next) => {
  const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!t) return next(new AppError('Testimonial not found', 404));
  res.json({ success: true, data: t });
});

const deleteTestimonial = asyncHandler(async (req, res, next) => {
  const t = await Testimonial.findByIdAndDelete(req.params.id);
  if (!t) return next(new AppError('Testimonial not found', 404));
  res.json({ success: true, message: 'Testimonial deleted successfully' });
});

module.exports = { getTestimonials, getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial };
