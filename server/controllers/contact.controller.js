const Contact = require('../models/Contact.model');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

// Public: submit contact form
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    throw new AppError('All fields are required', 400);
  }
  const contact = await Contact.create({ name, email, subject, message });
  res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
});

// Admin: get all messages
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, data: contacts });
});

// Admin: mark as read
const markAsRead = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  if (!contact) return next(new AppError('Message not found', 404));
  res.json({ success: true, data: contact });
});

// Admin: delete message
const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) return next(new AppError('Message not found', 404));
  res.json({ success: true, message: 'Message deleted successfully' });
});

module.exports = { submitContact, getContacts, markAsRead, deleteContact };
