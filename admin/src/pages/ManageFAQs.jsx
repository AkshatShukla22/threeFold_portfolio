import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '../api/faqs.api';
import { addToast } from '../redux/slices/toastSlice';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import './ManageFAQs.css';

const EMPTY = { question: '', answer: '', order: 0 };

const ManageFAQs = () => {
  const dispatch = useDispatch();
  const [faqs, setFaqs]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [deleteId, setDeleteId]   = useState(null);
  const [form, setForm]           = useState(EMPTY);

  const load = () => {
    setLoading(true);
    getFAQs().then((r) => setFaqs(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openEdit = (faq) => { setEditing(faq); setForm(faq); setModalOpen(true); };
  const openAdd  = ()    => { setEditing(null); setForm(EMPTY); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      dispatch(addToast({ type: 'error', message: 'Question and answer are required.' }));
      return;
    }
    setSaving(true);
    try {
      editing?._id ? await updateFAQ(editing._id, form) : await createFAQ(form);
      dispatch(addToast({ type: 'success', message: editing?._id ? 'FAQ updated!' : 'FAQ created!' }));
      setModalOpen(false); load();
    } catch (err) {
      dispatch(addToast({ type: 'error', message: err.response?.data?.message || 'Failed.' }));
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteFAQ(deleteId);
      dispatch(addToast({ type: 'success', message: 'FAQ deleted.' }));
      setDeleteId(null); load();
    } catch { dispatch(addToast({ type: 'error', message: 'Delete failed.' })); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">FAQs</h1>
          <p className="page-subtitle">{faqs.length} question{faqs.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <i className="fa-solid fa-plus"></i> Add FAQ
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="resource-skeleton-card" style={{ height: '70px', borderRadius: '10px' }}></div>
          ))}
        </div>
      ) : faqs.length > 0 ? (
        <div className="faq-admin-list">
          {faqs.map((faq, i) => (
            <div key={faq._id} className="faq-admin-item">
              <div className="faq-admin-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="faq-admin-content">
                <h3 className="faq-admin-q">{faq.question}</h3>
                <p className="faq-admin-a">{faq.answer}</p>
              </div>
              <div className="faq-admin-actions">
                <button className="btn btn-outline btn-sm" onClick={() => openEdit(faq)}>
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(faq._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fa-solid fa-circle-question"></i>
          <p>No FAQs yet. Add your first FAQ.</p>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing?._id ? 'Edit FAQ' : 'Add FAQ'} size="md">
        <div className="form-grid">
          <div className="form-group full">
            <label>Question *</label>
            <input value={form.question} onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))} placeholder="What is your question?" />
          </div>
          <div className="form-group full">
            <label>Answer *</label>
            <textarea rows={5} value={form.answer} onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))} placeholder="Detailed answer..." />
          </div>
          <div className="form-group">
            <label>Display Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: +e.target.value }))} />
          </div>
          <div className="form-actions full">
            <button className="btn btn-outline" onClick={() => setModalOpen(false)} disabled={saving}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save FAQ</>}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete FAQ" message="Delete this FAQ permanently?" loading={deleting} />
    </div>
  );
};

export default ManageFAQs;
