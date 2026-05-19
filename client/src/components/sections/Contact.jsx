import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { submitContact } from '../../api/index';
import { addToast } from '../../redux/slices/toastSlice';
import { validateContact } from '../../utils/index';
import { useScrollReveal } from '../../hooks/index';
import './Contact.css';

export default function Contact() {
  const dispatch = useDispatch();
  const { data: settings } = useSelector(s => s.settings);
  const ref = useScrollReveal();
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = e => { setForm(p => ({...p,[e.target.name]:e.target.value})); if(errors[e.target.name]) setErrors(p=>({...p,[e.target.name]:''})); };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validateContact(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await submitContact(form);
      dispatch(addToast({ type:'success', message:"Message sent! We'll be in touch soon." }));
      setForm({ name:'', email:'', subject:'', message:'' });
    } catch { dispatch(addToast({ type:'error', message:'Failed to send. Please try again.' })); }
    finally { setLoading(false); }
  };

  const info = [
    { icon:'fa-solid fa-envelope',      label:'Email Us',  value: settings?.email  || 'hello@threefold.dev',   href:`mailto:${settings?.email}` },
    { icon:'fa-solid fa-phone',         label:'Call Us',   value: settings?.phone  || '+1 (555) 000-0000',     href:`tel:${settings?.phone}` },
    { icon:'fa-solid fa-location-dot',  label:'Location',  value: settings?.address || 'Remote-first, worldwide' },
  ];

  return (
    <section className="section contact-sec" id="contact">
      <div className="container">
        <div className="section-header reveal" ref={ref}>
          <span className="section-label"><i className="fa-solid fa-paper-plane"></i>Get In Touch</span>
          <h2 className="section-title">Let's <span>Work Together</span></h2>
          <p className="section-sub">Fill in the form and we'll get back to you within 24 hours.</p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <motion.div className="contact-info"
            initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}>
            {info.map((item, i) => (
              <div key={i} className="contact-info-card">
                <div className="ci-icon"><i className={item.icon}></i></div>
                <div>
                  <span className="ci-label">{item.label}</span>
                  {item.href
                    ? <a href={item.href} className="ci-value">{item.value}</a>
                    : <span className="ci-value">{item.value}</span>}
                </div>
              </div>
            ))}
            <div className="contact-avail">
              <div className="avail-dot"></div>
              <span>Currently accepting new projects</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form className="contact-form" onSubmit={handleSubmit}
            initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.1 }}>
            <div className="cf-row">
              <div className={`cf-group ${errors.name?'err':''}`}>
                <label>Your Name</label>
                <div className="cf-input-wrap">
                  <i className="fa-solid fa-user"></i>
                  <input name="name" placeholder="John Doe" value={form.name} onChange={set} />
                </div>
                {errors.name && <span className="cf-err">{errors.name}</span>}
              </div>
              <div className={`cf-group ${errors.email?'err':''}`}>
                <label>Email Address</label>
                <div className="cf-input-wrap">
                  <i className="fa-solid fa-envelope"></i>
                  <input name="email" type="email" placeholder="john@example.com" value={form.email} onChange={set} />
                </div>
                {errors.email && <span className="cf-err">{errors.email}</span>}
              </div>
            </div>
            <div className={`cf-group ${errors.subject?'err':''}`}>
              <label>Subject</label>
              <div className="cf-input-wrap">
                <i className="fa-solid fa-tag"></i>
                <input name="subject" placeholder="Project Discussion" value={form.subject} onChange={set} />
              </div>
              {errors.subject && <span className="cf-err">{errors.subject}</span>}
            </div>
            <div className={`cf-group ${errors.message?'err':''}`}>
              <label>Message</label>
              <textarea name="message" rows={5} placeholder="Tell us about your project..." value={form.message} onChange={set}></textarea>
              {errors.message && <span className="cf-err">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary cf-submit" disabled={loading}>
              {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Sending...</> : <><i className="fa-solid fa-paper-plane"></i> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
