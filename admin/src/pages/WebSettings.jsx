import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSettings, updateSettings } from '../api/settings.api';
import { addToast } from '../redux/slices/toastSlice';
import ImageUpload from '../components/ImageUpload';
import './WebSettings.css';

const WebSettings = () => {
  const dispatch = useDispatch();
  const [form, setForm]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [activeTab, setTab]   = useState('general');

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const setSocial = (k, v) => setForm((p) => ({ ...p, socials: { ...p.socials, [k]: v } }));

  useEffect(() => {
    getSettings()
      .then((r) => setForm(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(form);
      dispatch(addToast({ type: 'success', message: 'Settings saved successfully!' }));
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err.response?.data?.message || 'Save failed.' }));
    } finally { setSaving(false); }
  };

  const tabs = [
    { id: 'general', label: 'General',  icon: 'fa-solid fa-gear' },
    { id: 'contact', label: 'Contact',  icon: 'fa-solid fa-envelope' },
    { id: 'socials', label: 'Socials',  icon: 'fa-solid fa-share-nodes' },
    { id: 'branding',label: 'Branding', icon: 'fa-solid fa-palette' },
  ];

  if (loading || !form) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-muted)', padding: 40 }}>
      <i className="fa-solid fa-spinner fa-spin"></i> Loading settings...
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Website Settings</h1>
          <p className="page-subtitle">Global configuration for ThreeFold Digital.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save All Changes</>}
        </button>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`settings-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <i className={t.icon}></i> {t.label}
          </button>
        ))}
      </div>

      <div className="admin-card">
        {/* General */}
        {activeTab === 'general' && (
          <div className="form-grid">
            <div className="form-group">
              <label>Firm Name</label>
              <input value={form.firmName} onChange={(e) => set('firmName', e.target.value)} placeholder="ThreeFold Digital" />
            </div>
            <div className="form-group">
              <label>Tagline</label>
              <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} placeholder="Building Tomorrow, Today" />
            </div>
            <div className="form-group full">
              <label>Footer Text</label>
              <input value={form.footerText} onChange={(e) => set('footerText', e.target.value)} placeholder="© 2025 ThreeFold Digital. All rights reserved." />
            </div>
          </div>
        )}

        {/* Contact */}
        {activeTab === 'contact' && (
          <div className="form-grid">
            <div className="form-group">
              <label>Contact Email</label>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="hello@example.com" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
            </div>
            <div className="form-group full">
              <label>Office Address</label>
              <textarea rows={2} value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="123 Business Ave, City, Country" />
            </div>
          </div>
        )}

        {/* Socials */}
        {activeTab === 'socials' && (
          <div className="form-grid">
            {['github', 'linkedin', 'twitter', 'instagram', 'youtube'].map((s) => (
              <div key={s} className="form-group">
                <label style={{ textTransform: 'capitalize' }}>{s} URL</label>
                <input value={form.socials?.[s] || ''} onChange={(e) => setSocial(s, e.target.value)} placeholder={`https://${s}.com/...`} />
              </div>
            ))}
          </div>
        )}

        {/* Branding */}
        {activeTab === 'branding' && (
          <div className="form-grid">
            <div className="form-group full">
              <ImageUpload label="Logo Image" value={form.logo} onChange={(url) => set('logo', url)} />
            </div>
            <div className="form-group full">
              <ImageUpload label="Favicon" value={form.favicon} onChange={(url) => set('favicon', url)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebSettings;
