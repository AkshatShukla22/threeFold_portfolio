const Team = require('../models/Team.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const getTeam = asyncHandler(async (req, res) => {
  const team = await Team.find().sort({ order: 1, createdAt: 1 });
  res.json({ success: true, data: team });
});

const getMember = asyncHandler(async (req, res, next) => {
  const member = await Team.findById(req.params.id);
  if (!member) return next(new AppError('Team member not found', 404));
  res.json({ success: true, data: member });
});

const createMember = asyncHandler(async (req, res) => {
  const member = await Team.create(req.body);
  res.status(201).json({ success: true, data: member });
});

const updateMember = asyncHandler(async (req, res, next) => {
  const member = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!member) return next(new AppError('Team member not found', 404));
  res.json({ success: true, data: member });
});

const deleteMember = asyncHandler(async (req, res, next) => {
  const member = await Team.findByIdAndDelete(req.params.id);
  if (!member) return next(new AppError('Team member not found', 404));
  res.json({ success: true, message: 'Team member deleted successfully' });
});

module.exports = { getTeam, getMember, createMember, updateMember, deleteMember };
