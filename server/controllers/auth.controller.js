const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');
const AppError = require('../utils/AppError');

// POST /api/auth/login
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Compare plain or hashed password stored in env
  const isMatch = password === adminPassword || await bcrypt.compare(password, adminPassword).catch(() => false);

  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  const token = generateToken({ email: adminEmail, role: 'admin' });

  res.json({
    success: true,
    token,
    admin: { email: adminEmail, role: 'admin' },
  });
});

// GET /api/auth/verify
const verify = asyncHandler(async (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = { login, verify };
