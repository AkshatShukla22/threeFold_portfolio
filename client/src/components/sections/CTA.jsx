import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/index';
import './CTA.css';

export default function CTA() {
  const ref = useScrollReveal();
  return (
    <section className="cta-sec">
      <div className="cta-orb-1"></div>
      <div className="cta-orb-2"></div>
      <div className="container">
        <motion.div className="cta-inner reveal" ref={ref}
          initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.55 }}>
          <span className="section-label"><i className="fa-solid fa-rocket"></i>Ready to Build?</span>
          <h2 className="cta-heading">Let's Create Something <span>Extraordinary</span></h2>
          <p className="cta-sub">Have an idea? Turn it into a product with ThreeFold. From MVP to enterprise — we build what you envision.</p>
          <div className="cta-btns">
            <Link to="/contact" className="btn btn-primary cta-btn"><i className="fa-solid fa-paper-plane"></i> Start Your Project</Link>
            <Link to="/projects" className="btn btn-outline cta-btn"><i className="fa-solid fa-eye"></i> See Our Work</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
