import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../api/testimonials.api';
import { addToast } from '../redux/slices/toastSlice';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import ImageUpload from '../components/ImageUpload';

const EMPTY = { name: '', role: '', company: '', message: '', rating: 5, avatar: '', featured: false, order: 0 };

const TestimonialForm = ({ initial, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="form-grid">
      <div className="form-group">
        <label>Client Name *</label>
        <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Jane Smith" />
      </div>
      <div className="form-group">
        <label>Rating (1-5)</label>
        <input type="number" min={1} max={5} value={form.rating} onChange={(e) => set('rating', +e.target.value)} />
      </div>
      <div className="form-group">
        <label>Role / Title</label>
        <input value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="CEO" />
      </div>
      <div className="form-group">
        <label>Company</label>
        <input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Acme Corp" />
      </div>
      <div className="form-group full">
        <label>Testimonial Message *</label>
        <textarea rows={4} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="What the client said..." />
      </div>
      <div className="form-group full">
        <ImageUpload label="Client Avatar" value={form.avatar} onChange={(url) => set('avatar', url)} />
      </div>
      <div className="form-group">
        <label>Display Order</label>
        <input type="number" value={form.order} onChange={(e) => set('order', +e.target.value)} />
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
          Mark as Featured
        </label>
      </div>
      <div className="form-actions full">
        <button className="btn btn-outline" onClick={onCancel} disabled={loading}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSave(form)} disabled={loading}>
          {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save</>}
        </button>
      </div>
    </div>
  );
};

const ManageTestimonials = () => {
  const dispatch = useDispatch();
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [deleteId, setDeleteId]   = useState(null);

  const load = () => {
    setLoading(true);
    getTestimonials().then((r) => setItems(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (form) => {
    setSaving(true);
    try {
      editing?._id ? await updateTestimonial(editing._id, form) : await createTestimonial(form);
      dispatch(addToast({ type: 'success', message: editing?._id ? 'Updated!' : 'Created!' }));
      setModalOpen(false); setEditing(null); load();
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err.response?.data?.message || 'Failed.' }));
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTestimonial(deleteId);
      dispatch(addToast({ type: 'success', message: 'Deleted.' }));
      setDeleteId(null); load();
    } catch { dispatch(addToast({ type: 'error', message: 'Delete failed.' })); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Testimonials</h1>
          <p className="page-subtitle">{items.length} testimonial{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
          <i className="fa-solid fa-plus"></i> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="resource-skeleton">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="resource-skeleton-card" style={{ height: '160px' }}></div>)}
        </div>
      ) : items.length > 0 ? (
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="resource-table">
            <thead>
              <tr>
                <th>Avatar</th><th>Client</th><th>Company</th><th>Rating</th><th>Message</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t._id}>
                  <td>
                    {t.avatar
                      ? <img src={t.avatar} alt={t.name} className="td-thumb" style={{ borderRadius: '50%' }} />
                      : <div className="td-thumb-placeholder" style={{ borderRadius: '50%' }}>{t.name?.charAt(0)}</div>
                    }
                  </td>
                  <td>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{t.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}</span>
                  </td>
                  <td>{t.company || '—'}</td>
                  <td>
                    <span style={{ color: '#fbbf24' }}>
                      {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                    </span>
                  </td>
                  <td style={{ maxWidth: '240px' }}>
                    <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {t.message}
                    </span>
                  </td>
                  <td>
                    <div className="td-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => { setEditing(t); setModalOpen(true); }}>
                        <i className="fa-solid fa-pen"></i> Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(t._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <i className="fa-solid fa-comments"></i>
          <p>No testimonials yet.</p>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing?._id ? 'Edit Testimonial' : 'Add Testimonial'} size="md">
        <TestimonialForm initial={editing || EMPTY} onSave={handleSave} onCancel={() => { setModalOpen(false); setEditing(null); }} loading={saving} />
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Testimonial" message="Delete this testimonial permanently?" loading={deleting} />
    </div>
  );
};

export default ManageTestimonials;
