const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title:           { type: String, required: true, trim: true },
    description:     { type: String, required: true },
    longDescription: { type: String, default: '' },
    thumbnail:       { type: String, default: '' },
    images:          [{ url: String, public_id: String }],   // ← array of {url, public_id}
    techStack:       [{ type: String }],
    category:        { type: String, required: true, default: 'Web Development' },
    liveLink:        { type: String, default: '' },
    githubLink:      { type: String, default: '' },
    featured:        { type: Boolean, default: false },
    order:           { type: Number,  default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
