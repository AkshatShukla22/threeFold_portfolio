import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Topbar.css';

const pageTitles = {
  '/':             'Dashboard',
  '/hero':         'Manage Hero',
  '/services':     'Manage Services',
  '/projects':     'Manage Projects',
  '/testimonials': 'Manage Testimonials',
  '/faqs':         'Manage FAQs',
  '/team':         'Manage Team',
  '/contacts':     'Messages',
  '/settings':     'Website Settings',
};

const Topbar = () => {
  const { pathname } = useLocation();
  const { admin }    = useSelector((s) => s.auth);
  const title        = pageTitles[pathname] || 'Admin';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
      </div>
      <div className="topbar-right">
        <a
          href={import.meta.env.VITE_SITE_URL || 'http://localhost:5173'}
          target="_blank"
          rel="noreferrer"
          className="topbar-site-link"
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
          View Site
        </a>
        <div className="topbar-user">
          <div className="topbar-avatar">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <span>{admin?.email || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
