const express  = require('express');
const router   = express.Router();
const { uploadImage, uploadMultiple } = require('../controllers/upload.controller');
const { protect } = require('../middleware/auth.middleware');
const upload   = require('../middleware/upload.middleware');

router.post('/',        protect, upload.single('image'),      uploadImage);
router.post('/multiple',protect, upload.array('images', 10),  uploadMultiple);

module.exports = router;
