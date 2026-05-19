const Project = require('../models/Project.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const getProjects = asyncHandler(async (req, res) => {
  const { category, featured, search } = req.query;
  const filter = {};

  if (category && category !== 'All') filter.category = category;
  if (featured === 'true') filter.featured = true;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: projects });
});

const getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) return next(new AppError('Project not found', 404));
  res.json({ success: true, data: project });
});

const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

const updateProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) return next(new AppError('Project not found', 404));
  res.json({ success: true, data: project });
});

const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return next(new AppError('Project not found', 404));
  res.json({ success: true, message: 'Project deleted successfully' });
});

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
