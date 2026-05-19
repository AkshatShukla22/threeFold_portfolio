import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getServices, createService, updateService, deleteService } from '../api/services.api';
import { addToast } from '../redux/slices/toastSlice';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import './ManageServices.css';

const EMPTY = { title: '', description: '', icon: 'fa-solid fa-code', technologies: '', featured: false, order: 0 };

const ServiceForm = ({ initial, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="form-grid">
      <div className="form-group">
        <label>Title *</label>
        <input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Web Development" />
      </div>
      <div className="form-group">
        <label>FontAwesome Icon Class</label>
        <input value={form.icon} onChange={(e) => set('icon', e.target.value)} placeholder="fa-solid fa-code" />
      </div>
      <div className="form-group full">
        <label>Description *</label>
        <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Service description..." />
      </div>
      <div className="form-group">
        <label>Technologies (comma-separated)</label>
        <input value={form.technologies} onChange={(e) => set('technologies', e.target.value)} placeholder="React, Node.js, MongoDB" />
      </div>
      <div className="form-group">
        <label>Display Order</label>
        <input type="number" value={form.order} onChange={(e) => set('order', +e.target.value)} />
      </div>
      <div className="form-group full">
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

const ManageServices = () => {
  const dispatch = useDispatch();
  const [services, setServices]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [deleteId, setDeleteId]   = useState(null);

  const load = () => {
    setLoading(true);
    getServices().then((r) => setServices(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (form) => {
    const payload = {
      ...form,
      technologies: typeof form.technologies === 'string'
        ? form.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : form.technologies,
    };
    setSaving(true);
    try {
      if (editing?._id) {
        await updateService(editing._id, payload);
        dispatch(addToast({ type: 'success', message: 'Service updated!' }));
      } else {
        await createService(payload);
        dispatch(addToast({ type: 'success', message: 'Service created!' }));
      }
      setModalOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err.response?.data?.message || 'Save failed.' }));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteService(deleteId);
      dispatch(addToast({ type: 'success', message: 'Service deleted.' }));
      setDeleteId(null);
      load();
    } catch {
      dispatch(addToast({ type: 'error', message: 'Delete failed.' }));
    } finally {
      setDeleting(false);
    }
  };

  const openEdit = (s) => {
    setEditing({ ...s, technologies: s.technologies?.join(', ') || '' });
    setModalOpen(true);
  };

  const openAdd = () => { setEditing(null); setModalOpen(true); };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Services</h1>
          <p className="page-subtitle">{services.length} service{services.length !== 1 ? 's' : ''} listed</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <i className="fa-solid fa-plus"></i> Add Service
        </button>
      </div>

      {loading ? (
        <div className="resource-skeleton">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="resource-skeleton-card"></div>)}
        </div>
      ) : services.length > 0 ? (
        <div className="resource-grid">
          {services.map((s) => (
            <div key={s._id} className="resource-card">
              <div className="resource-card-top">
                <div className="resource-icon"><i className={s.icon || 'fa-solid fa-code'}></i></div>
                <div className="resource-badges">
                  {s.featured && <span className="badge badge-info">Featured</span>}
                </div>
              </div>
              <h3 className="resource-title">{s.title}</h3>
              <p className="resource-desc">{s.description}</p>
              {s.technologies?.length > 0 && (
                <div className="resource-tags">
                  {s.technologies.slice(0, 3).map((t) => <span key={t} className="resource-tag">{t}</span>)}
                </div>
              )}
              <div className="resource-actions">
                <button className="btn btn-outline btn-sm" onClick={() => openEdit(s)}>
                  <i className="fa-solid fa-pen"></i> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(s._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fa-solid fa-bolt"></i>
          <p>No services yet. Add your first service.</p>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing?._id ? 'Edit Service' : 'Add Service'} size="md">
        <ServiceForm
          initial={editing || EMPTY}
          onSave={handleSave}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          loading={saving}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This cannot be undone."
        loading={deleting}
      />
    </div>
  );
};

export default ManageServices;
