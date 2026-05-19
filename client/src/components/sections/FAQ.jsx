import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetch, useScrollReveal } from '../../hooks/index';
import { fetchFAQs } from '../../api/index';
import './FAQ.css';

export default function FAQ() {
  const { data, loading } = useFetch(fetchFAQs);
  const [open, setOpen]   = useState(0);
  const ref = useScrollReveal();

  if (!loading && (!data || data.length === 0)) return null;

  return (
    <section className="section faq-sec">
      <div className="container">
        <div className="faq-layout">
          <div className="faq-left reveal" ref={ref}>
            <span className="section-label"><i className="fa-solid fa-circle-question"></i>FAQ</span>
            <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            <p className="section-sub">Can't find your answer? <a href="/contact" style={{ color:'var(--primary)' }}>Contact us directly</a>.</p>
          </div>
          <div className="faq-list">
            {loading
              ? Array.from({length:5}).map((_,i) => (
                  <div key={i} className="skeleton" style={{ height:56, borderRadius:12, marginBottom:8 }}></div>
                ))
              : data?.map((faq, i) => (
                  <motion.div key={faq._id}
                    initial={{ opacity:0, x:20 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.35, delay: i * 0.06 }}>
                    <div className={`faq-item ${open === i ? 'open' : ''}`}>
                      <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                        <span>{faq.question}</span>
                        <div className={`faq-icon ${open === i ? 'rot' : ''}`}>
                          <i className="fa-solid fa-plus"></i>
                        </div>
                      </button>
                      <AnimatePresence>
                        {open === i && (
                          <motion.div className="faq-a-wrap"
                            initial={{ height:0, opacity:0 }}
                            animate={{ height:'auto', opacity:1 }}
                            exit={{ height:0, opacity:0 }}
                            transition={{ duration:0.28 }}>
                            <p className="faq-a">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}
