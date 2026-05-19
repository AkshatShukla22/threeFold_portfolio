const Service = require('../models/Service.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: services });
});

const getService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) return next(new AppError('Service not found', 404));
  res.json({ success: true, data: service });
});

const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

const updateService = asyncHandler(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) return next(new AppError('Service not found', 404));
  res.json({ success: true, data: service });
});

const deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return next(new AppError('Service not found', 404));
  res.json({ success: true, message: 'Service deleted successfully' });
});

module.exports = { getServices, getService, createService, updateService, deleteService };
