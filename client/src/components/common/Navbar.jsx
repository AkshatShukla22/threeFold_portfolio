import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoIcon from '../../assets/logos/logo-icon.png';
import './Navbar.css';

const links = [
  { to: '/',         label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about',    label: 'About' },
  { to: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname }            = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`nav ${scrolled ? 'nav-scroll' : 'nav-top'}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <img src={logoIcon} alt="ThreeFold Digital" className="nav-logo-icon" />
        </Link>

        <nav className="nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn btn-primary nav-cta">
          <i className="fa-solid fa-paper-plane"></i> Let's Talk
        </Link>

        <button
          className={`nav-burger ${open ? 'open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav-mobile ${open ? 'nav-mobile-open' : ''}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'}
            className={({ isActive }) => `nav-mob-link ${isActive ? 'active' : ''}`}>
            {l.label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn btn-primary" style={{ justifyContent: 'center', marginTop: 8 }}>
          <i className="fa-solid fa-paper-plane"></i> Let's Talk
        </Link>
      </div>
    </header>
  );
}