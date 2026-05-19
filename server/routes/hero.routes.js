const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/hero.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getHero);
router.put('/', protect, updateHero);

module.exports = router;
