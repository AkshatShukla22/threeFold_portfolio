import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects }     from '../api/projects.api';
import { getServices }     from '../api/services.api';
import { getContacts }     from '../api/contacts.api';
import { getTestimonials } from '../api/testimonials.api';
import StatCard from '../components/StatCard';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats]     = useState({ projects: 0, services: 0, messages: 0, testimonials: 0 });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProjects(), getServices(), getContacts(), getTestimonials()])
      .then(([p, s, c, t]) => {
        setStats({
          projects:     p.data.data.length,
          services:     s.data.data.length,
          messages:     c.data.data.length,
          testimonials: t.data.data.length,
        });
        setMessages(c.data.data.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const quickLinks = [
    { to: '/services',     icon: 'fa-solid fa-bolt',           label: 'Add Service' },
    { to: '/projects',     icon: 'fa-solid fa-briefcase',      label: 'Add Project' },
    { to: '/testimonials', icon: 'fa-solid fa-comments',       label: 'Add Testimonial' },
    { to: '/faqs',         icon: 'fa-solid fa-circle-question',label: 'Add FAQ' },
    { to: '/team',         icon: 'fa-solid fa-user-plus',      label: 'Add Member' },
    { to: '/settings',     icon: 'fa-solid fa-gear',           label: 'Site Settings' },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back — here's your site overview.</p>
        </div>
        <Link to="/contacts" className="btn btn-primary">
          <i className="fa-solid fa-envelope"></i>
          View Messages
        </Link>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <StatCard icon="fa-solid fa-briefcase"      label="Total Projects"     value={stats.projects}     color="primary" loading={loading} />
        <StatCard icon="fa-solid fa-bolt"           label="Total Services"     value={stats.services}     color="accent"  loading={loading} />
        <StatCard icon="fa-solid fa-envelope"       label="Total Messages"     value={stats.messages}     color="warning" loading={loading} />
        <StatCard icon="fa-solid fa-comments"       label="Testimonials"       value={stats.testimonials} color="success" loading={loading} />
      </div>

      <div className="dashboard-body">
        {/* Recent Messages */}
        <div className="admin-card dashboard-messages">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fa-solid fa-inbox"></i>
              Recent Messages
            </h2>
            <Link to="/contacts" className="btn btn-outline btn-sm">View All</Link>
          </div>

          {loading ? (
            <div className="dashboard-skeleton">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="msg-skeleton">
                  <div className="skeleton-line" style={{ width: '40%' }}></div>
                  <div className="skeleton-line" style={{ width: '70%' }}></div>
                </div>
              ))}
            </div>
          ) : messages.length > 0 ? (
            <div className="message-list">
              {messages.map((m) => (
                <div key={m._id} className={`message-item ${!m.isRead ? 'unread' : ''}`}>
                  <div className="message-avatar">
                    {m.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="message-body">
                    <div className="message-top">
                      <strong className="message-name">{m.name}</strong>
                      {!m.isRead && <span className="badge badge-info">New</span>}
                      <span className="message-date">
                        {new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <span className="message-subject">{m.subject}</span>
                    <p className="message-preview">{m.message?.slice(0, 80)}...</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-inbox"></i>
              <p>No messages yet.</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="admin-card dashboard-quick">
          <div className="card-header">
            <h2 className="card-title">
              <i className="fa-solid fa-rocket"></i>
              Quick Actions
            </h2>
          </div>
          <div className="quick-links">
            {quickLinks.map((l) => (
              <Link key={l.to} to={l.to} className="quick-link">
                <div className="quick-link-icon"><i className={l.icon}></i></div>
                <span>{l.label}</span>
                <i className="fa-solid fa-chevron-right quick-link-arrow"></i>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
