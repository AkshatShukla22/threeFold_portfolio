import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetch, useScrollReveal } from '../../hooks/index';
import { fetchTestimonials } from '../../api/index';
import './Testimonials.css';

const Stars = ({ r = 5 }) => (
  <div className="t-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <i key={i} className={`fa-star ${i < r ? 'fa-solid' : 'fa-regular'}`}></i>
    ))}
  </div>
);

export default function Testimonials() {
  const { data, loading } = useFetch(fetchTestimonials);
  const ref = useScrollReveal();
  const [page, setPage] = useState(0);

  const items = data || [];
  const perPage = 2;
  const pages = Math.ceil(items.length / perPage);
  const visible = items.slice(page * perPage, page * perPage + perPage);

  if (!loading && items.length === 0) return null;

  return (
    <section className="section t-sec">
      <div className="container">
        <div className="section-header reveal" ref={ref}>
          <span className="section-label"><i className="fa-solid fa-comments"></i>Client Voices</span>
          <h2 className="section-title">What Our <span>Clients Say</span></h2>
        </div>

        {!loading && (
          <>
            <AnimatePresence mode="wait">
              <motion.div key={page} className="t-grid"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}>
                {visible.map((t, i) => (
                  <div key={t._id} className="t-card">
                    <i className="fa-solid fa-quote-left t-quote"></i>
                    <Stars r={t.rating} />
                    <p className="t-msg">"{t.message}"</p>
                    <div className="t-author">
                      {t.avatar
                        ? <img src={t.avatar} alt={t.name} className="t-avatar" />
                        : <div className="t-avatar-ph">{t.name?.charAt(0)}</div>}
                      <div>
                        <strong className="t-name">{t.name}</strong>
                        <span className="t-role">{t.role}{t.company ? `, ${t.company}` : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {pages > 1 && (
              <div className="t-nav">
                <button className="t-nav-btn" onClick={() => setPage(p => (p - 1 + pages) % pages)}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="t-dots">
                  {Array.from({ length: pages }).map((_, i) => (
                    <button key={i} className={`t-dot ${i === page ? 'active' : ''}`} onClick={() => setPage(i)} />
                  ))}
                </div>
                <button className="t-nav-btn" onClick={() => setPage(p => (p + 1) % pages)}>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
