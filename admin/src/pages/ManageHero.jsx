import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getHero, updateHero } from '../api/hero.api';
import { addToast } from '../redux/slices/toastSlice';
import ImageUpload from '../components/ImageUpload';
import './ManageHero.css';

const ManageHero = () => {
  const dispatch = useDispatch();
  const [form, setForm]     = useState({
    heading: '', subheading: '', description: '',
    primaryBtnText: '', primaryBtnLink: '',
    secondaryBtnText: '', secondaryBtnLink: '',
    backgroundImage: '',
    stats: [
      { label: 'Projects Delivered', value: '120+' },
      { label: 'Happy Clients',      value: '85+' },
      { label: 'Years Experience',   value: '6+' },
      { label: 'Team Members',       value: '15+' },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    getHero()
      .then((r) => setForm(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleStatChange = (i, field, val) => {
    const stats = [...form.stats];
    stats[i] = { ...stats[i], [field]: val };
    set('stats', stats);
  };

  const addStat    = () => set('stats', [...form.stats, { label: '', value: '' }]);
  const removeStat = (i) => set('stats', form.stats.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHero(form);
      dispatch(addToast({ type: 'success', message: 'Hero section updated!' }));
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err.response?.data?.message || 'Update failed.' }));
    } finally { setSaving(false); }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', padding: 40 }}>
      <i className="fa-solid fa-spinner fa-spin"></i> Loading...
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage Hero</h1>
          <p className="page-subtitle">Edit the homepage hero section content.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save Changes</>}
        </button>
      </div>

      <div className="hero-editor">
        {/* Main Content */}
        <div className="admin-card">
          <h2 className="editor-section-title"><i className="fa-solid fa-pen-nib"></i> Main Content</h2>
          <div className="form-grid">
            <div className="form-group full">
              <label>Heading</label>
              <input value={form.heading} onChange={(e) => set('heading', e.target.value)} placeholder="We Build Digital Experiences" />
              <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Wrap a word in &lt;span&gt;&lt;/span&gt; for gradient highlight.</small>
            </div>
            <div className="form-group full">
              <label>Subheading / Badge Text</label>
              <input value={form.subheading} onChange={(e) => set('subheading', e.target.value)} placeholder="Full-Stack Software Agency" />
            </div>
            <div className="form-group full">
              <label>Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Short compelling description..." />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="admin-card">
          <h2 className="editor-section-title"><i className="fa-solid fa-hand-pointer"></i> CTA Buttons</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Primary Button Text</label>
              <input value={form.primaryBtnText} onChange={(e) => set('primaryBtnText', e.target.value)} placeholder="View Our Work" />
            </div>
            <div className="form-group">
              <label>Primary Button Link</label>
              <input value={form.primaryBtnLink} onChange={(e) => set('primaryBtnLink', e.target.value)} placeholder="/projects" />
            </div>
            <div className="form-group">
              <label>Secondary Button Text</label>
              <input value={form.secondaryBtnText} onChange={(e) => set('secondaryBtnText', e.target.value)} placeholder="Get In Touch" />
            </div>
            <div className="form-group">
              <label>Secondary Button Link</label>
              <input value={form.secondaryBtnLink} onChange={(e) => set('secondaryBtnLink', e.target.value)} placeholder="/contact" />
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="admin-card">
          <h2 className="editor-section-title"><i className="fa-solid fa-image"></i> Background Image</h2>
          <ImageUpload value={form.backgroundImage} onChange={(url) => set('backgroundImage', url)} />
        </div>

        {/* Stats */}
        <div className="admin-card">
          <div className="card-header">
            <h2 className="editor-section-title"><i className="fa-solid fa-chart-bar"></i> Statistics</h2>
            <button className="btn btn-outline btn-sm" onClick={addStat}>
              <i className="fa-solid fa-plus"></i> Add Stat
            </button>
          </div>
          <div className="stats-editor">
            {form.stats?.map((stat, i) => (
              <div key={i} className="stat-editor-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Value</label>
                  <input value={stat.value} onChange={(e) => handleStatChange(i, 'value', e.target.value)} placeholder="120+" />
                </div>
                <div className="form-group" style={{ flex: 2 }}>
                  <label>Label</label>
                  <input value={stat.label} onChange={(e) => handleStatChange(i, 'label', e.target.value)} placeholder="Projects Delivered" />
                </div>
                <button className="btn btn-danger btn-sm stat-remove" onClick={() => removeStat(i)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageHero;
