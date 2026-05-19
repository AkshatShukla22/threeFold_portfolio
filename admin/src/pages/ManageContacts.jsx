import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getContacts, markRead, deleteContact } from '../api/contacts.api';
import { addToast } from '../redux/slices/toastSlice';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import './ManageContacts.css';

const ManageContacts = () => {
  const dispatch = useDispatch();
  const [contacts, setContacts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [deleting, setDeleting]   = useState(false);
  const [selected, setSelected]   = useState(null);
  const [deleteId, setDeleteId]   = useState(null);

  const load = () => {
    setLoading(true);
    getContacts().then((r) => setContacts(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleMarkRead = async (id) => {
    try {
      await markRead(id);
      setContacts((prev) => prev.map((c) => c._id === id ? { ...c, isRead: true } : c));
    } catch { dispatch(addToast({ type: 'error', message: 'Failed to mark as read.' })); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteContact(deleteId);
      dispatch(addToast({ type: 'success', message: 'Message deleted.' }));
      setDeleteId(null); load();
    } catch { dispatch(addToast({ type: 'error', message: 'Delete failed.' })); }
    finally { setDeleting(false); }
  };

  const unread = contacts.filter((c) => !c.isRead).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Messages</h1>
          <p className="page-subtitle">{contacts.length} total — {unread} unread</p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="resource-skeleton-card" style={{ height: '80px', borderRadius: '10px' }}></div>
          ))}
        </div>
      ) : contacts.length > 0 ? (
        <div className="contacts-list">
          {contacts.map((c) => (
            <div key={c._id} className={`contact-row ${!c.isRead ? 'unread' : ''}`}>
              <div className="contact-avatar">{c.name?.charAt(0).toUpperCase()}</div>
              <div className="contact-body" onClick={() => { setSelected(c); if (!c.isRead) handleMarkRead(c._id); }}>
                <div className="contact-top">
                  <strong className="contact-name">{c.name}</strong>
                  {!c.isRead && <span className="badge badge-info">New</span>}
                  <span className="contact-date">
                    {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <span className="contact-email">{c.email}</span>
                <span className="contact-subject">{c.subject}</span>
                <p className="contact-preview">{c.message?.slice(0, 100)}...</p>
              </div>
              <div className="contact-actions">
                {!c.isRead && (
                  <button className="btn btn-success btn-sm" onClick={() => handleMarkRead(c._id)} title="Mark as read">
                    <i className="fa-solid fa-check"></i>
                  </button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(c._id)} title="Delete">
                  <i className="fa-solid fa-trash"></i>
                </button>
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

      {/* Message Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Message Detail" size="md">
        {selected && (
          <div className="contact-detail">
            <div className="contact-detail-row">
              <span className="contact-detail-label"><i className="fa-solid fa-user"></i> From</span>
              <span>{selected.name}</span>
            </div>
            <div className="contact-detail-row">
              <span className="contact-detail-label"><i className="fa-solid fa-envelope"></i> Email</span>
              <a href={`mailto:${selected.email}`} style={{ color: 'var(--color-primary)' }}>{selected.email}</a>
            </div>
            <div className="contact-detail-row">
              <span className="contact-detail-label"><i className="fa-solid fa-tag"></i> Subject</span>
              <span>{selected.subject}</span>
            </div>
            <div className="contact-detail-row">
              <span className="contact-detail-label"><i className="fa-solid fa-calendar"></i> Date</span>
              <span>{new Date(selected.createdAt).toLocaleString()}</span>
            </div>
            <div className="contact-detail-message">
              <span className="contact-detail-label"><i className="fa-solid fa-message"></i> Message</span>
              <p>{selected.message}</p>
            </div>
            <div style={{ marginTop: 20 }}>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="btn btn-primary">
                <i className="fa-solid fa-reply"></i> Reply via Email
              </a>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Message" message="Delete this message permanently?" loading={deleting} />
    </div>
  );
};

export default ManageContacts;
