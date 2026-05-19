const Hero = require('../models/Hero.model');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/hero
const getHero = asyncHandler(async (req, res) => {
  let hero = await Hero.findOne();
  if (!hero) {
    hero = await Hero.create({
      heading: 'We Build Digital Experiences',
      subheading: 'Full-Stack Software Agency',
      description: 'We craft scalable, modern web and mobile solutions for startups and enterprises worldwide.',
      stats: [
        { label: 'Projects Delivered', value: '120+' },
        { label: 'Happy Clients', value: '85+' },
        { label: 'Years Experience', value: '6+' },
        { label: 'Team Members', value: '15+' },
      ],
    });
  }
  res.json({ success: true, data: hero });
});

// PUT /api/hero
const updateHero = asyncHandler(async (req, res) => {
  let hero = await Hero.findOne();
  if (!hero) {
    hero = await Hero.create(req.body);
  } else {
    hero = await Hero.findByIdAndUpdate(hero._id, req.body, { new: true, runValidators: true });
  }
  res.json({ success: true, data: hero });
});

module.exports = { getHero, updateHero };
