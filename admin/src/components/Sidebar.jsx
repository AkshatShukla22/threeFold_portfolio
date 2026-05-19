import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { getContacts } from '../api/contacts.api';
import './Sidebar.css';

const navItems = [
  { to: '/',             icon: 'fa-solid fa-gauge',           label: 'Dashboard' },
  { to: '/hero',         icon: 'fa-solid fa-star',            label: 'Manage Hero' },
  { to: '/services',     icon: 'fa-solid fa-bolt',            label: 'Services' },
  { to: '/projects',     icon: 'fa-solid fa-briefcase',       label: 'Projects' },
  { to: '/testimonials', icon: 'fa-solid fa-comments',        label: 'Testimonials' },
  { to: '/faqs',         icon: 'fa-solid fa-circle-question', label: 'FAQs' },
  { to: '/team',         icon: 'fa-solid fa-users',           label: 'Team' },
  { to: '/contacts',     icon: 'fa-solid fa-envelope',        label: 'Messages', badge: true },
  { to: '/settings',     icon: 'fa-solid fa-gear',            label: 'Settings' },
];

export default function Sidebar() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [unread, setUnread] = useState(0);

  // Poll for unread messages every 30 seconds
  useEffect(() => {
    const fetchUnread = () => {
      getContacts()
        .then(r => setUnread(r.data.data.filter(c => !c.isRead).length))
        .catch(() => {});
    };
    fetchUnread();
    const iv = setInterval(fetchUnread, 30000);
    return () => clearInterval(iv);
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon"><i className="fa-solid fa-code"></i></span>
        <div>
          <span className="sidebar-logo-name">ThreeFold</span>
          <span className="sidebar-logo-sub">Admin Panel</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Navigation</span>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span className="sl-icon-wrap">
              <i className={item.icon}></i>
              {item.badge && unread > 0 && (
                <span className="sidebar-badge">{unread > 9 ? '9+' : unread}</span>
              )}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={() => { dispatch(logout()); navigate('/login'); }}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
