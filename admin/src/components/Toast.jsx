import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeToast } from '../redux/slices/toastSlice';
import './Toast.css';

const Toast = ({ toasts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    toasts.forEach((t) => {
      const timer = setTimeout(() => dispatch(removeToast(t.id)), t.duration || 4000);
      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  const icons = {
    success: 'fa-solid fa-circle-check',
    error:   'fa-solid fa-circle-xmark',
    info:    'fa-solid fa-circle-info',
    warning: 'fa-solid fa-triangle-exclamation',
  };

  return (
    <div className="admin-toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`admin-toast admin-toast-${t.type || 'info'}`}>
          <i className={icons[t.type || 'info']}></i>
          <span>{t.message}</span>
          <button onClick={() => dispatch(removeToast(t.id))}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
