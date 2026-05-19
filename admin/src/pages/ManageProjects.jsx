import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects.api';
import { addToast } from '../redux/slices/toastSlice';
import { uploadImage } from '../api/upload.api';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import ImageUpload from '../components/ImageUpload';
import './ManageProjects.css';

const EMPTY = {
  title: '', description: '', longDescription: '', thumbnail: '',
  images: [], techStack: '', category: 'Web Development',
  liveLink: '', githubLink: '', featured: false, order: 0,
};

const CATEGORIES = ['Web Development','Mobile App','UI/UX Design','E-Commerce','SaaS','API / Backend','Other'];

/* ── Multi-image uploader ───────────────────────────── */
const MultiImageUpload = ({ value = [], onChange }) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        Array.from(files).map(async f => {
          const res = await uploadImage(f);
          return { url: res.data.url, public_id: res.data.public_id };
        })
      );
      onChange([...value, ...uploaded]);
    } catch {
      alert('One or more uploads failed. Check Cloudinary credentials.');
    } finally {
      setUploading(false);
    }
  };

  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div className="multi-img-upload">
      {/* Preview grid */}
      {value.length > 0 && (
        <div className="multi-img-grid">
          {value.map((img, i) => (
            <div key={i} className="multi-img-item">
              <img src={img.url} alt={`Project ${i + 1}`} />
              <button className="multi-img-remove" type="button" onClick={() => remove(i)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              {i === 0 && <span className="multi-img-thumb-label">Thumbnail</span>}
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <div
        className={`multi-img-zone ${uploading ? 'uploading' : ''}`}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}>
        {uploading
          ? <><i className="fa-solid fa-spinner fa-spin"></i><span>Uploading...</span></>
          : <><i className="fa-solid fa-cloud-arrow-up"></i><span>Click or drag images here</span><small>First image becomes thumbnail · JPG, PNG, WebP · max 8 MB each</small></>
        }
      </div>

      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }}
        onChange={e => handleFiles(e.target.files)} />
    </div>
  );
};

/* ── Project Form ──────────────────────────────────── */
const ProjectForm = ({ initial, onSave, onCancel, loading }) => {
  const [form, setForm] = useState(initial);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // When images change, auto-set thumbnail from first image
  const handleImages = (imgs) => {
    set('images', imgs);
    if (imgs.length > 0 && !form.thumbnail) set('thumbnail', imgs[0].url);
    if (imgs.length > 0) set('thumbnail', imgs[0].url);
  };

  return (
    <div className="form-grid">
      <div className="form-group">
        <label>Title *</label>
        <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Project name" />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select value={form.category} onChange={e => set('category', e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="form-group full">
        <label>Short Description *</label>
        <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Brief description shown on cards" />
      </div>

      <div className="form-group full">
        <label>Long Description</label>
        <textarea rows={4} value={form.longDescription} onChange={e => set('longDescription', e.target.value)} placeholder="Detailed description for project detail page" />
      </div>

      {/* Multi image upload */}
      <div className="form-group full">
        <label>Project Images <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(first image = thumbnail)</span></label>
        <MultiImageUpload value={form.images || []} onChange={handleImages} />
      </div>

      <div className="form-group full">
        <label>Tech Stack (comma-separated)</label>
        <input value={form.techStack} onChange={e => set('techStack', e.target.value)} placeholder="React, Node.js, MongoDB, AWS" />
      </div>

      <div className="form-group">
        <label>Live URL</label>
        <input value={form.liveLink} onChange={e => set('liveLink', e.target.value)} placeholder="https://example.com" />
      </div>
      <div className="form-group">
        <label>GitHub URL</label>
        <input value={form.githubLink} onChange={e => set('githubLink', e.target.value)} placeholder="https://github.com/..." />
      </div>
      <div className="form-group">
        <label>Display Order</label>
        <input type="number" value={form.order} onChange={e => set('order', +e.target.value)} />
      </div>
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
          Mark as Featured
        </label>
      </div>

      <div className="form-actions full">
        <button className="btn btn-outline" onClick={onCancel} disabled={loading}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSave(form)} disabled={loading}>
          {loading
            ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</>
            : <><i className="fa-solid fa-floppy-disk"></i> Save Project</>}
        </button>
      </div>
    </div>
  );
};

/* ── Page ──────────────────────────────────────────── */
const ManageProjects = () => {
  const dispatch = useDispatch();
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [deleteId, setDeleteId]   = useState(null);
  const [search, setSearch]       = useState('');

  const load = () => {
    setLoading(true);
    getProjects().then(r => setProjects(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (form) => {
    const payload = {
      ...form,
      techStack: typeof form.techStack === 'string'
        ? form.techStack.split(',').map(t => t.trim()).filter(Boolean)
        : form.techStack,
      // thumbnail = first image url if images exist
      thumbnail: form.images?.length > 0 ? form.images[0].url : form.thumbnail,
    };
    setSaving(true);
    try {
      if (editing?._id) await updateProject(editing._id, payload);
      else              await createProject(payload);
      dispatch(addToast({ type: 'success', message: editing?._id ? 'Project updated!' : 'Project created!' }));
      setModalOpen(false); setEditing(null); load();
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err.response?.data?.message || 'Save failed.' }));
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProject(deleteId);
      dispatch(addToast({ type: 'success', message: 'Project deleted.' }));
      setDeleteId(null); load();
    } catch {
      dispatch(addToast({ type: 'error', message: 'Delete failed.' }));
    } finally { setDeleting(false); }
  };

  const openEdit = (p) => {
    setEditing({
      ...p,
      techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : p.techStack || '',
      images: p.images || [],
    });
    setModalOpen(true);
  };

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">{projects.length} project{projects.length !== 1 ? 's' : ''} in portfolio</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="admin-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
            <i className="fa-solid fa-plus"></i> Add Project
          </button>
        </div>
      </div>

      {loading ? (
        <div className="resource-skeleton">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="resource-skeleton-card"></div>)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="resource-table">
            <thead>
              <tr>
                <th>Images</th><th>Title</th><th>Category</th><th>Tech</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p._id}>
                  <td>
                    <div className="td-img-stack">
                      {p.images?.length > 0
                        ? p.images.slice(0, 3).map((img, i) => (
                            <img key={i} src={img.url} alt="" className="td-thumb"
                              style={{ marginLeft: i > 0 ? -12 : 0, zIndex: 3 - i }} />
                          ))
                        : p.thumbnail
                          ? <img src={p.thumbnail} alt="" className="td-thumb" />
                          : <div className="td-thumb-placeholder"><i className="fa-solid fa-image"></i></div>
                      }
                      {p.images?.length > 3 && (
                        <div className="td-img-more">+{p.images.length - 3}</div>
                      )}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.title}</td>
                  <td><span className="badge badge-info">{p.category}</span></td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {(Array.isArray(p.techStack) ? p.techStack : []).slice(0, 3).join(', ')}
                    {(Array.isArray(p.techStack) ? p.techStack : []).length > 3 ? '...' : ''}
                  </td>
                  <td>
                    {p.featured
                      ? <span className="badge badge-success">Featured</span>
                      : <span className="badge badge-warning">Normal</span>}
                  </td>
                  <td>
                    <div className="td-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openEdit(p)}>
                        <i className="fa-solid fa-pen"></i> Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(p._id)}>
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
          <i className="fa-solid fa-briefcase"></i>
          <p>{search ? 'No matching projects.' : 'No projects yet. Add your first project.'}</p>
        </div>
      )}

      <Modal isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        title={editing?._id ? 'Edit Project' : 'Add Project'}
        size="lg">
        <ProjectForm
          initial={editing || EMPTY}
          onSave={handleSave}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          loading={saving} />
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={handleDelete} title="Delete Project"
        message="Delete this project and all its images permanently?" loading={deleting} />
    </div>
  );
};

export default ManageProjects;
