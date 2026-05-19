import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOMeta from '../components/common/SEOMeta';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <SEOMeta title="404 — Page Not Found" />
      <div className="nf-page">
        <div className="nf-orb"></div>
        <div className="container nf-content">
          <motion.div className="nf-inner"
            initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <div className="nf-code">404</div>
            <i className="fa-solid fa-triangle-exclamation nf-icon"></i>
            <h1 className="nf-title">Page Not Found</h1>
            <p className="nf-desc">Looks like this page drifted into deep space. Let's get you back on track.</p>
            <div className="nf-btns">
              <Link to="/" className="btn btn-primary"><i className="fa-solid fa-house"></i> Back to Home</Link>
              <Link to="/contact" className="btn btn-outline"><i className="fa-solid fa-paper-plane"></i> Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
