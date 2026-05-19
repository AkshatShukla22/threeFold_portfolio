import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../api/auth.api';
import { loginSuccess } from '../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow]     = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const res = await login(form);
      dispatch(loginSuccess(res.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-orb login-orb-1"></div>
      <div className="login-orb login-orb-2"></div>

      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <i className="fa-solid fa-code"></i>
          </div>
          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">ThreeFold Digital — Secure Access</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              <i className="fa-solid fa-circle-xmark"></i>
              {error}
            </div>
          )}

          <div className="login-field">
            <label>Email Address</label>
            <div className="login-input-wrap">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login-field">
            <label>Password</label>
            <div className="login-input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input
                type={show ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-toggle-pass"
                onClick={() => setShow(!show)}
                tabIndex={-1}
              >
                <i className={`fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading
              ? <><i className="fa-solid fa-spinner fa-spin"></i> Signing in...</>
              : <><i className="fa-solid fa-right-to-bracket"></i> Sign In</>
            }
          </button>
        </form>

        <p className="login-footer">
          <i className="fa-solid fa-shield-halved"></i>
          Protected area — authorised access only
        </p>
      </div>
    </div>
  );
};

export default Login;
