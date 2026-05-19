const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    firmName: { type: String, default: 'ThreeFold Digital' },
    tagline: { type: String, default: 'Building Tomorrow, Today' },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    email: { type: String, default: 'hello@threefold.dev' },
    phone: { type: String, default: '+1 (555) 000-0000' },
    address: { type: String, default: '' },
    socials: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
    footerText: { type: String, default: '© 2025 ThreeFold Digital. All rights reserved.' },
    trustedByLogos: [{ name: String, logo: String }],
    techStackLogos: [{ name: String, icon: String }],
    workflowSteps: [{ title: String, description: String, icon: String }],
    whyUs: [{ title: String, description: String, icon: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
