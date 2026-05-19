const express = require('express');
const router = express.Router();
const { login, verify } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/login', login);
router.get('/verify', protect, verify);

module.exports = router;
