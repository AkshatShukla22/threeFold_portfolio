const express = require('express');
const router = express.Router();
const { submitContact, getContacts, markAsRead, deleteContact } = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', submitContact);                          // public
router.get('/', protect, getContacts);                    // admin
router.put('/:id/read', protect, markAsRead);             // admin
router.delete('/:id', protect, deleteContact);            // admin

module.exports = router;
