const FAQ = require('../models/FAQ.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const getFAQs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 });
  res.json({ success: true, data: faqs });
});

const createFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json({ success: true, data: faq });
});

const updateFAQ = asyncHandler(async (req, res, next) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!faq) return next(new AppError('FAQ not found', 404));
  res.json({ success: true, data: faq });
});

const deleteFAQ = asyncHandler(async (req, res, next) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) return next(new AppError('FAQ not found', 404));
  res.json({ success: true, message: 'FAQ deleted successfully' });
});

module.exports = { getFAQs, createFAQ, updateFAQ, deleteFAQ };
