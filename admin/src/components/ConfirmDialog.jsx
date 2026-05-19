import Modal from './Modal';
import './ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = 'Are you sure?', message, loading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
    <div className="confirm-dialog">
      <div className="confirm-icon">
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>
      <p className="confirm-message">{message || 'This action cannot be undone.'}</p>
      <div className="confirm-actions">
        <button className="btn btn-outline" onClick={onClose} disabled={loading}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
          {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Deleting...</> : <><i className="fa-solid fa-trash"></i> Delete</>}
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;
