import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCounter } from '../../hooks/index';
import './Stats.css';

const STATS = [
  { label:'Projects Delivered', value:'120+', icon:'fa-solid fa-briefcase' },
  { label:'Happy Clients',      value:'85+',  icon:'fa-solid fa-face-smile' },
  { label:'Years Experience',   value:'6+',   icon:'fa-solid fa-calendar' },
  { label:'Team Members',       value:'15+',  icon:'fa-solid fa-users' },
  { label:'Countries Served',   value:'12+',  icon:'fa-solid fa-globe' },
  { label:'Client Uptime',      value:'99%',  icon:'fa-solid fa-server' },
];

function StatItem({ label, value, icon, index }) {
  const ref     = useRef(null);
  const [active, setActive] = useState(false);
  const count   = useCounter(value, 2200, active);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div ref={ref} className="stat-item"
      initial={{ opacity:0, y:24 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.45, delay: index * 0.08 }}>
      <div className="stat-icon"><i className={icon}></i></div>
      <span className="stat-val">{count}</span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="stats-sec">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((s, i) => <StatItem key={i} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
