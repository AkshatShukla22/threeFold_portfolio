import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/index';
import './WhyUs.css';

const reasons = [
  { icon: 'fa-solid fa-users',          title: 'Expert Team',        desc: 'Senior engineers with 5+ years of real-world product experience.' },
  { icon: 'fa-solid fa-clock',          title: 'On-Time',            desc: 'We ship on schedule every single time, no excuses.' },
  { icon: 'fa-solid fa-layer-group',    title: 'Clean Code',         desc: 'Maintainable, documented, scalable architectures.' },
  { icon: 'fa-solid fa-shield-halved',  title: 'Transparent',        desc: 'Real-time updates, open comms, zero surprises.' },
  { icon: 'fa-solid fa-headset',        title: 'Post-Launch',        desc: 'We stay with you after go-live with ongoing support.' },
  { icon: 'fa-solid fa-lock',           title: 'Secure First',       desc: 'Security baked in from day one of every project.' },
];

export default function WhyUs() {
  const ref = useScrollReveal();
  return (
    <section className="section whyus-sec">
      <div className="container">
        <div className="section-header reveal" ref={ref}>
          <span className="section-label"><i className="fa-solid fa-star"></i>Why Choose Us</span>
          <h2 className="section-title">The ThreeFold <span>Difference</span></h2>
        </div>
        <div className="whyus-row">
          {reasons.map((r, i) => (
            <motion.div key={i} className="why-chip"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.02 }}>
              <div className="why-chip-icon"><i className={r.icon}></i></div>
              <div className="why-chip-body">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
