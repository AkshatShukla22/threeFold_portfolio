const Settings = require('../models/Settings.model');
const asyncHandler = require('../utils/asyncHandler');

const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      firmName: 'ThreeFold Digital',
      tagline: 'Building Tomorrow, Today',
      email: 'hello@threefold.dev',
      phone: '+1 (555) 000-0000',
      footerText: '© 2025 ThreeFold Digital. All rights reserved.',
      workflowSteps: [
        { title: 'Discovery', description: 'We understand your goals, audience, and technical requirements.', icon: 'fa-solid fa-magnifying-glass' },
        { title: 'Planning', description: 'We architect the solution, define milestones and tech stack.', icon: 'fa-solid fa-diagram-project' },
        { title: 'Design', description: 'We create stunning UI/UX prototypes and design systems.', icon: 'fa-solid fa-pen-ruler' },
        { title: 'Development', description: 'We build with clean, scalable, production-ready code.', icon: 'fa-solid fa-code' },
        { title: 'Testing', description: 'We run rigorous QA, performance, and security testing.', icon: 'fa-solid fa-vial' },
        { title: 'Launch', description: 'We deploy, monitor, and support your product post-launch.', icon: 'fa-solid fa-rocket' },
      ],
      whyUs: [
        { title: 'Expert Team', description: 'Senior engineers with 5+ years of real-world product experience.', icon: 'fa-solid fa-users' },
        { title: 'On-Time Delivery', description: 'We respect timelines and ship on schedule, every time.', icon: 'fa-solid fa-clock' },
        { title: 'Clean Code', description: 'Maintainable, documented, and scalable codebases.', icon: 'fa-solid fa-star' },
        { title: 'Full Transparency', description: 'Real-time updates, open communication, no surprises.', icon: 'fa-solid fa-shield-halved' },
      ],
      techStackLogos: [
        { name: 'React', icon: 'fa-brands fa-react' },
        { name: 'Node.js', icon: 'fa-brands fa-node-js' },
        { name: 'MongoDB', icon: 'fa-solid fa-database' },
        { name: 'JavaScript', icon: 'fa-brands fa-js' },
        { name: 'Python', icon: 'fa-brands fa-python' },
        { name: 'AWS', icon: 'fa-brands fa-aws' },
        { name: 'Docker', icon: 'fa-brands fa-docker' },
        { name: 'Git', icon: 'fa-brands fa-git-alt' },
      ],
    });
  }
  res.json({ success: true, data: settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(req.body);
  } else {
    settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
  }
  res.json({ success: true, data: settings });
});

module.exports = { getSettings, updateSettings };
