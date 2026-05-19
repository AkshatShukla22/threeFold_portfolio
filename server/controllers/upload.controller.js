const asyncHandler = require('../utils/asyncHandler');
const AppError     = require('../utils/AppError');

// POST /api/upload  — single image
const uploadImage = asyncHandler(async (req, res, next) => {
  console.log('Upload hit. req.file:', req.file);
  if (!req.file) return next(new AppError('No file uploaded', 400));
  res.json({
    success:   true,
    url:       req.file.path,        // Cloudinary secure URL
    public_id: req.file.filename,    // Cloudinary public_id
  });
});

// POST /api/upload/multiple  — up to 10 images
const uploadMultiple = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length === 0)
    return next(new AppError('No files uploaded', 400));
  const files = req.files.map(f => ({ url: f.path, public_id: f.filename }));
  res.json({ success: true, files });
});

module.exports = { uploadImage, uploadMultiple };
