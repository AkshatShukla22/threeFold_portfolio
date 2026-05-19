import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchTeam } from '../api/index';
import SEOMeta from '../components/common/SEOMeta';
import WhyUs from '../components/sections/WhyUs';
import Stats from '../components/sections/Stats';
import CTA from '../components/sections/CTA';
import './About.css';

const TeamCard = ({ member, index }) => (
  <motion.div className="team-card"
    initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
    viewport={{ once:true }} transition={{ duration:0.45, delay: index * 0.08 }}>
    <div className="team-avatar-wrap">
      {member.avatar
        ? <img src={member.avatar} alt={member.name} />
        : <div className="team-avatar-ph">{member.name?.charAt(0)}</div>}
    </div>
    <h3 className="team-name">{member.name}</h3>
    <span className="team-role">{member.role}</span>
    {member.bio && <p className="team-bio">{member.bio}</p>}
    <div className="team-socials">
      {member.socials?.github   && <a href={member.socials.github}   target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>}
      {member.socials?.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>}
      {member.socials?.twitter  && <a href={member.socials.twitter}  target="_blank" rel="noreferrer"><i className="fa-brands fa-x-twitter"></i></a>}
    </div>
  </motion.div>
);

export default function About() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchTeam().then(r => setTeam(r.data.data)).catch(() => {});
  }, []);

  return (
    <>
      <SEOMeta title="About" description="Learn about ThreeFold Digital — our story, mission, values and the team behind the work." />

      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="container" style={{ position:'relative', zIndex:2, textAlign:'center' }}>
          <span className="section-label"><i className="fa-solid fa-users"></i>Our Story</span>
          <h1 className="page-hero-title">About <span>ThreeFold</span></h1>
          <p className="page-hero-desc">We're a passionate team of engineers, designers and strategists building the digital products of tomorrow.</p>
        </div>
      </div>

      {/* Mission */}
      <section className="section about-mission">
        <div className="container">
          <div className="mission-grid">
            <motion.div className="mission-text"
              initial={{ opacity:0, x:-28 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.5 }}>
              <span className="section-label"><i className="fa-solid fa-bullseye"></i>Our Mission</span>
              <h2 className="section-title">Building Products <span>That Matter</span></h2>
              <p className="about-p">ThreeFold Digital was founded with a singular mission — bridge the gap between great ideas and great software. We believe every business deserves world-class engineering, regardless of size.</p>
              <p className="about-p">We partner with startups and enterprises, bringing deep technical expertise and a human-centred design philosophy to ship products people love.</p>
              <div className="mission-chips">
                {[['fa-solid fa-heart','Passion-driven'],['fa-solid fa-handshake','Client-first'],['fa-solid fa-trophy','Excellence'],['fa-solid fa-lightbulb','Innovation']].map(([icon, label]) => (
                  <div key={label} className="mission-chip"><i className={icon}></i><span>{label}</span></div>
                ))}
              </div>
            </motion.div>

            <motion.div className="mission-cards"
              initial={{ opacity:0, x:28 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:0.12 }}>
              {[
                { icon:'fa-solid fa-code',   title:'Clean Code',    desc:'Scalable, maintainable architectures built to last.' },
                { icon:'fa-solid fa-rocket', title:'Fast Delivery', desc:'Agile sprints — shipped on schedule, every time.' },
                { icon:'fa-solid fa-lock',   title:'Secure First',  desc:'Security baked in from day one of every project.' },
              ].map((c, i) => (
                <motion.div key={i} className="mission-card"
                  initial={{ opacity:0, x:20 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.4, delay: 0.15 + i * 0.1 }}>
                  <div className="mc-icon"><i className={c.icon}></i></div>
                  <div>
                    <strong>{c.title}</strong>
                    <span>{c.desc}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Stats />
      <WhyUs />

      {/* Team */}
      {team.length > 0 && (
        <section className="section team-sec">
          <div className="container">
            <div className="section-header">
              <span className="section-label"><i className="fa-solid fa-users"></i>The Team</span>
              <h2 className="section-title">People Behind <span>ThreeFold</span></h2>
              <p className="section-sub">Senior engineers, designers and strategists who care deeply about craft.</p>
            </div>
            <div className="team-grid">
              {team.map((m, i) => <TeamCard key={m._id} member={m} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
