import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchHero } from '../../api/index';
import { useScrollReveal, useCounter } from '../../hooks/index';
import './Hero.css';

const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'const ', c: 'kw' }, { t: 'client', c: 'var' }, { t: ' = ', c: 'op' }, { t: 'await ', c: 'kw' }, { t: 'ThreeFold', c: 'fn' }, { t: '.build({', c: 'tx' }] },
  { indent: 1, tokens: [{ t: 'vision', c: 'prop' }, { t: ': ', c: 'op' }, { t: '"Your Idea"', c: 'str' }, { t: ',', c: 'tx' }] },
  { indent: 1, tokens: [{ t: 'stack', c: 'prop' }, { t: ': [', c: 'op' }, { t: '"React"', c: 'str' }, { t: ', ', c: 'tx' }, { t: '"Node"', c: 'str' }, { t: ', ', c: 'tx' }, { t: '"AI"', c: 'str' }, { t: '],', c: 'tx' }] },
  { indent: 1, tokens: [{ t: 'quality', c: 'prop' }, { t: ': ', c: 'op' }, { t: '"premium"', c: 'str' }, { t: ',', c: 'tx' }] },
  { indent: 1, tokens: [{ t: 'deadline', c: 'prop' }, { t: ': ', c: 'op' }, { t: '"on-time"', c: 'str' }, { t: ',', c: 'tx' }] },
  { indent: 0, tokens: [{ t: '});', c: 'tx' }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: '// Result: ', c: 'cm' }, { t: '✓ Shipped', c: 'success' }] },
];

const FLOAT_BADGES = [
  { icon: 'fa-brands fa-react',   label: 'React 18',    x: '78%', y: '18%', delay: 0 },
  { icon: 'fa-brands fa-node-js', label: 'Node.js',     x: '80%', y: '58%', delay: 0.4 },
  { icon: 'fa-solid fa-database', label: 'MongoDB',      x: '68%', y: '80%', delay: 0.8 },
  { icon: 'fa-brands fa-aws',     label: 'AWS',          x: '-2%', y: '70%', delay: 1.2 },
];

const StatCounter = ({ label, value }) => {
  const ref = useScrollReveal();
  const [active, setActive] = useState(false);
  const innerRef = useRef(null);
  const count = useCounter(value, 2000, active);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hero-stat reveal" ref={ref}>
      <div ref={innerRef}>
        <span className="hero-stat-val">{count}</span>
        <span className="hero-stat-label">{label}</span>
      </div>
    </div>
  );
};

export default function Hero() {
  const [hero, setHero] = useState(null);
  const [typedLines, setTypedLines] = useState(0);

  useEffect(() => {
    fetchHero().then(r => setHero(r.data.data)).catch(() => {});
    // Animate code lines appearing one by one
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTypedLines(i);
      if (i >= CODE_LINES.length) clearInterval(iv);
    }, 320);
    return () => clearInterval(iv);
  }, []);

  const h = hero || {
    heading: 'We Design, Develop & Automate',
    description: 'ThreeFold Digital builds high-performance web products — from MVPs to enterprise platforms — with pixel-perfect UI and scalable architecture.',
    primaryBtnText: 'View Our Work',
    primaryBtnLink: '/projects',
    secondaryBtnText: 'Start a Project',
    secondaryBtnLink: '/contact',
    stats: [
      { label: 'Projects', value: '120+' },
      { label: 'Clients',  value: '85+' },
      { label: 'Uptime',   value: '99%' },
      { label: 'Support',  value: '24/7' },
    ],
  };

  return (
    <section className="hero">
      <div className="hero-bg-grid"></div>
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>

      <div className="container hero-container">
        {/* Left — text */}
        <div className="hero-left">
          <motion.div className="hero-badge"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="hero-badge-dot"></span>
            Designing · Development · Automation
          </motion.div>

          <motion.h1 className="hero-heading"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
            {h.heading?.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="hero-heading-grad">{h.heading?.split(' ').slice(-1)[0]}</span>
          </motion.h1>

          <motion.p className="hero-desc"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
            {h.description}
          </motion.p>

          <motion.div className="hero-btns"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}>
            <Link to={h.primaryBtnLink || '/projects'} className="btn btn-primary hero-btn-lg">
              {h.primaryBtnText} <i className="fa-solid fa-arrow-right"></i>
            </Link>
            <Link to={h.secondaryBtnLink || '/contact'} className="btn btn-outline hero-btn-lg">
              {h.secondaryBtnText}
            </Link>
          </motion.div>

          {h.stats?.length > 0 && (
            <div className="hero-stats">
              {h.stats.map((s, i) => <StatCounter key={i} {...s} />)}
            </div>
          )}
        </div>

        {/* Right — animated code editor */}
        <motion.div className="hero-right"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>

          {/* Floating tech badges */}
          {FLOAT_BADGES.map((b, i) => (
            <motion.div key={i} className="hero-float-badge"
              style={{ left: b.x, top: b.y }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + b.delay, duration: 0.4 }}
              whileHover={{ scale: 1.1 }}>
              <i className={b.icon}></i>
              <span>{b.label}</span>
            </motion.div>
          ))}

          {/* Code editor card */}
          <div className="hero-editor">
            {/* Editor top bar */}
            <div className="editor-bar">
              <div className="editor-dots">
                <span style={{ background: '#FF5F57' }}></span>
                <span style={{ background: '#FFBD2E' }}></span>
                <span style={{ background: '#28C840' }}></span>
              </div>
              <span className="editor-filename">threefold.build.js</span>
              <span className="editor-lang">JavaScript</span>
            </div>

            {/* Line numbers + code */}
            <div className="editor-body">
              {CODE_LINES.map((line, i) => (
                <motion.div key={i} className={`editor-line ${typedLines > i ? 'visible' : 'hidden'}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={typedLines > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.25 }}>
                  <span className="editor-lnum">{i + 1}</span>
                  <span className="editor-code">
                    {'  '.repeat(line.indent)}
                    {line.tokens.map((tok, j) => (
                      <span key={j} className={`tok-${tok.c}`}>{tok.t}</span>
                    ))}
                    {typedLines === i + 1 && <span className="editor-cursor">|</span>}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Status bar */}
            <div className="editor-statusbar">
              <span><i className="fa-solid fa-circle-check" style={{ color: '#28C840' }}></i> Build successful</span>
              <span>UTF-8 · JS · Ln {Math.min(typedLines, CODE_LINES.length)}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="hero-scroll-ind"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
      </motion.div>
    </section>
  );
}
