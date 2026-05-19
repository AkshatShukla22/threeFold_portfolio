import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logoIcon from '../../assets/logos/logo-icon.png';
import './Footer.css';

const LINKS = [
  { to:'/',         label:'Home' },
  { to:'/services', label:'Services' },
  { to:'/projects', label:'Projects' },
  { to:'/about',    label:'About' },
  { to:'/contact',  label:'Contact' },
];

const SOCIALS = [
  { key:'github',    icon:'fa-brands fa-github',    label:'GitHub' },
  { key:'linkedin',  icon:'fa-brands fa-linkedin',  label:'LinkedIn' },
  { key:'twitter',   icon:'fa-brands fa-x-twitter', label:'Twitter' },
  { key:'instagram', icon:'fa-brands fa-instagram', label:'Instagram' },
];

export default function Footer() {
  const { data } = useSelector(s => s.settings);
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="grad-divider"></div>
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <img src={logoIcon} alt="ThreeFold Digital" className="footer-logo-img" />
              <span className="footer-logo-text">ThreeFold Digital</span>
            </Link>
            <p className="footer-tagline">{data?.tagline || 'Designing · Development · Automation'}</p>
            <p className="footer-desc">
              We craft high-performance digital products — from MVPs to enterprise platforms with pixel-perfect UI and scalable architecture.
            </p>
            <div className="footer-socials">
              {SOCIALS.map(s => data?.socials?.[s.key] && (
                <a key={s.key} href={data.socials[s.key]} target="_blank" rel="noreferrer"
                  aria-label={s.label} className="footer-social">
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              {LINKS.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="footer-link">
                    <i className="fa-solid fa-chevron-right"></i>{l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              {['Web Development','Mobile Apps','UI/UX Design','API Development','Cloud & DevOps','Automation'].map(s => (
                <li key={s}>
                  <Link to="/services" className="footer-link">
                    <i className="fa-solid fa-chevron-right"></i>{s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-contact">
              {data?.email && (
                <li>
                  <i className="fa-solid fa-envelope"></i>
                  <a href={`mailto:${data.email}`}>{data.email}</a>
                </li>
              )}
              {data?.phone && (
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <a href={`tel:${data.phone}`}>{data.phone}</a>
                </li>
              )}
              {data?.address && (
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{data.address}</span>
                </li>
              )}
            </ul>
            <Link to="/contact" className="btn btn-primary footer-cta">
              <i className="fa-solid fa-paper-plane"></i> Start a Project
            </Link>
          </div>
        </div>

        {/* Footer bottom — legal links replace the "Built with" credit */}
        <div className="footer-bottom">
          <p>{data?.footerText || `© ${year} ThreeFold Digital. All rights reserved.`}</p>
          <div className="footer-legal-links">
            <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
            <span className="footer-legal-sep">·</span>
            <Link to="/terms" className="footer-legal-link">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}