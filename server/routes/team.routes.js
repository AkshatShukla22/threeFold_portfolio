const express = require('express');
const router = express.Router();
const { getTeam, getMember, createMember, updateMember, deleteMember } = require('../controllers/team.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getTeam);
router.get('/:id', getMember);
router.post('/', protect, createMember);
router.put('/:id', protect, updateMember);
router.delete('/:id', protect, deleteMember);

module.exports = router;
