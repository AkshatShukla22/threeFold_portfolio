// Toast.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeToast } from '../../redux/slices/toastSlice';
import './Toast.css';

const ICONS = { success:'fa-solid fa-circle-check', error:'fa-solid fa-circle-xmark', info:'fa-solid fa-circle-info', warning:'fa-solid fa-triangle-exclamation' };

export default function Toast({ toasts }) {
  const dispatch = useDispatch();
  useEffect(() => {
    toasts.forEach(t => { const id = setTimeout(() => dispatch(removeToast(t.id)), t.duration || 4000); return () => clearTimeout(id); });
  }, [toasts, dispatch]);
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type||'info'}`}>
          <i className={ICONS[t.type||'info']}></i>
          <span>{t.message}</span>
          <button onClick={() => dispatch(removeToast(t.id))}><i className="fa-solid fa-xmark"></i></button>
        </div>
      ))}
    </div>
  );
}
