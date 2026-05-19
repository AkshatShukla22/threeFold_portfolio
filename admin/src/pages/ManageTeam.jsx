import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTeam, createMember, updateMember, deleteMember } from '../api/team.api';
import { addToast } from '../redux/slices/toastSlice';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import ImageUpload from '../components/ImageUpload';

const EMPTY = { name: '', role: '', bio: '', avatar: '', order: 0, socials: { linkedin: '', github: '', twitter: '' } };

const MemberForm = ({ initial, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const setSocial = (k, v) => setForm((p) => ({ ...p, socials: { ...p.socials, [k]: v } }));

  return (
    <div className="form-grid">
      <div className="form-group">
        <label>Full Name *</label>
        <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="John Doe" />
      </div>
      <div className="form-group">
        <label>Role / Position *</label>
        <input value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="Senior Developer" />
      </div>
      <div className="form-group full">
        <label>Bio</label>
        <textarea rows={3} value={form.bio} onChange={(e) => set('bio', e.target.value)} placeholder="Short bio..." />
      </div>
      <div className="form-group full">
        <ImageUpload label="Profile Avatar" value={form.avatar} onChange={(url) => set('avatar', url)} />
      </div>
      <div className="form-group">
        <label>GitHub URL</label>
        <input value={form.socials?.github} onChange={(e) => setSocial('github', e.target.value)} placeholder="https://github.com/..." />
      </div>
      <div className="form-group">
        <label>LinkedIn URL</label>
        <input value={form.socials?.linkedin} onChange={(e) => setSocial('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
      </div>
      <div className="form-group">
        <label>Twitter / X URL</label>
        <input value={form.socials?.twitter} onChange={(e) => setSocial('twitter', e.target.value)} placeholder="https://x.com/..." />
      </div>
      <div className="form-group">
        <label>Display Order</label>
        <input type="number" value={form.order} onChange={(e) => set('order', +e.target.value)} />
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

const ManageTeam = () => {
  const dispatch = useDispatch();
  const [team, setTeam]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [deleteId, setDeleteId]   = useState(null);

  const load = () => {
    setLoading(true);
    getTeam().then((r) => setTeam(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (form) => {
    setSaving(true);
    try {
      editing?._id ? await updateMember(editing._id, form) : await createMember(form);
      dispatch(addToast({ type: 'success', message: editing?._id ? 'Member updated!' : 'Member added!' }));
      setModalOpen(false); setEditing(null); load();
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err.response?.data?.message || 'Failed.' }));
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteMember(deleteId);
      dispatch(addToast({ type: 'success', message: 'Member removed.' }));
      setDeleteId(null); load();
    } catch { dispatch(addToast({ type: 'error', message: 'Delete failed.' })); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Team</h1>
          <p className="page-subtitle">{team.length} member{team.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
          <i className="fa-solid fa-user-plus"></i> Add Member
        </button>
      </div>

      {loading ? (
        <div className="resource-skeleton">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="resource-skeleton-card"></div>)}
        </div>
      ) : team.length > 0 ? (
        <div className="resource-grid">
          {team.map((m) => (
            <div key={m._id} className="resource-card" style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                {m.avatar
                  ? <img src={m.avatar} alt={m.name} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }} />
                  : <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>{m.name?.charAt(0)}</div>
                }
              </div>
              <h3 className="resource-title">{m.name}</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.role}</span>
              {m.bio && <p className="resource-desc" style={{ marginTop: 8 }}>{m.bio}</p>}
              <div className="resource-actions" style={{ justifyContent: 'center' }}>
                <button className="btn btn-outline btn-sm" onClick={() => { setEditing(m); setModalOpen(true); }}>
                  <i className="fa-solid fa-pen"></i> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(m._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fa-solid fa-users"></i>
          <p>No team members yet.</p>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing?._id ? 'Edit Member' : 'Add Member'} size="md">
        <MemberForm initial={editing || EMPTY} onSave={handleSave} onCancel={() => { setModalOpen(false); setEditing(null); }} loading={saving} />
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Remove Member" message="Remove this team member?" loading={deleting} />
    </div>
  );
};

export default ManageTeam;
