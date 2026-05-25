import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verify } from '../api/auth.api';
import { tokenExpired } from '../redux/slices/authSlice';
import { isTokenValid } from '../redux/slices/authSlice';

export default function ProtectedRoute() {
  const { isAuthenticated, token } = useSelector(s => s.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // No token at all → redirect immediately
    if (!token) {
      setChecking(false);
      return;
    }

    // Token exists but is expired client-side → clear and redirect
    if (!isTokenValid(token)) {
      dispatch(tokenExpired());
      setChecking(false);
      return;
    }

    // Token looks valid client-side → verify with server
    verify()
      .then(() => setChecking(false))
      .catch(() => {
        // Server rejected the token (expired, tampered, etc.)
        dispatch(tokenExpired());
        setChecking(false);
      });
  }, [token, dispatch]);

  // Show nothing while we verify — prevents flash of protected content
  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{
          width: 44, height: 44,
          border: '3px solid transparent',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Verifying session...</p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
