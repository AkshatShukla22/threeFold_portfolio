const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, default: 'We Build Digital Experiences' },
    subheading: { type: String, default: 'Full-Stack Software Agency' },
    description: { type: String, default: 'We craft scalable, modern web and mobile solutions for startups and enterprises.' },
    primaryBtnText: { type: String, default: 'View Our Work' },
    primaryBtnLink: { type: String, default: '/projects' },
    secondaryBtnText: { type: String, default: 'Get In Touch' },
    secondaryBtnLink: { type: String, default: '/contact' },
    backgroundImage: { type: String, default: '' },
    stats: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hero', heroSchema);
