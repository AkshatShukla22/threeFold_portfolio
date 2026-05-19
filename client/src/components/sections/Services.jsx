import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useFetch, useScrollReveal } from '../../hooks/index';
import { fetchServices } from '../../api/index';
import './Services.css';

/* ── Variants ─────────────────────────────────────── */
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardV = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const iconV = {
  rest:  { rotate: 0, scale: 1 },
  hover: {
    rotate: [0, -14, 14, -8, 0], scale: 1.18,
    transition: { duration: 0.55 },
  },
};

const badgeV = {
  rest:  { scale: 1, y: 0 },
  hover: {
    scale: [1, 1.15, 0.95, 1.08, 1], y: [-1, -3, 0],
    transition: { duration: 0.45 },
  },
};

const beamV = {
  rest:  { x: '-120%', opacity: 0 },
  hover: {
    x: '120%', opacity: [0, 0.7, 0],
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

const underlineV = {
  rest:  { scaleX: 0, originX: 0 },
  hover: { scaleX: 1, originX: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const arrowV = {
  rest:  { x: 0, opacity: 0 },
  hover: { x: 8, opacity: 1, transition: { duration: 0.25 } },
};

const glowV = {
  rest:  { opacity: 0, scale: 0.6 },
  hover: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const tagV = {
  hidden: { opacity: 0, x: -10, scale: 0.85 },
  show: (i) => ({
    opacity: 1, x: 0, scale: 1,
    transition: { delay: i * 0.07, duration: 0.35, ease: 'easeOut' },
  }),
};

/* ── 3-D tilt wrapper ─────────────────────────────── */
function TiltCard({ children }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 280, damping: 28 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 280, damping: 28 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ── Service card ─────────────────────────────────── */
function ServiceCard({ service }) {
  return (
    <motion.div variants={cardV} style={{ perspective: 800 }}>
      <TiltCard>
        <motion.div className="svc-card" initial="rest" whileHover="hover" animate="rest">

          {/* Light beam sweep */}
          <motion.div className="svc-beam" variants={beamV} />

          {/* Top-right ambient glow */}
          <motion.div className="svc-corner-glow" variants={glowV} />

          {/* Animated border on hover */}
          <div className="svc-border-anim" />

          {/* Icon */}
          <div className="svc-icon-wrap">
            <motion.div className="svc-icon" variants={iconV}>
              <i className={service.icon || 'fa-solid fa-code'}></i>
            </motion.div>
            {/* Ring pulse on hover */}
            <motion.div
              className="svc-icon-ring"
              variants={{
                rest:  { scale: 1, opacity: 0 },
                hover: { scale: [1, 1.5, 1.8], opacity: [0.5, 0.3, 0],
                  transition: { duration: 0.7, repeat: Infinity } },
              }}
            />
          </div>

          {/* Featured badge */}
          {service.featured && (
            <motion.span className="svc-badge" variants={badgeV}>
              <i className="fa-solid fa-star"></i> Featured
            </motion.span>
          )}

          {/* Title + underline */}
          <h3 className="svc-title">{service.title}</h3>
          <motion.div className="svc-underline" variants={underlineV} />

          {/* Description — fade up slightly on hover */}
          <motion.p
            className="svc-desc"
            variants={{
              rest:  { y: 0, color: 'var(--text-2)' },
              hover: { y: -2, color: 'var(--text)',
                transition: { duration: 0.3 } },
            }}>
            {service.description}
          </motion.p>

          {/* Tech tags staggered */}
          {service.technologies?.length > 0 && (
            <motion.div
              className="svc-tags"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}>
              {service.technologies.slice(0, 4).map((t, i) => (
                <motion.span key={t} className="svc-tag" custom={i} variants={tagV}>
                  {t}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Learn more row */}
          <div className="svc-footer">
            <motion.span className="svc-learn" variants={arrowV}>
              Learn more&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </motion.span>
          </div>

        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

/* ── Animated skeleton ────────────────────────────── */
function SkelCard() {
  return (
    <div className="svc-skel">
      <motion.div
        animate={{ opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="svc-sk-icon" />
        <div className="svc-sk-line w55" />
        <div className="svc-sk-line w100" />
        <div className="svc-sk-line w75" />
        <div className="svc-sk-tags">
          <div className="svc-sk-tag" /><div className="svc-sk-tag" /><div className="svc-sk-tag" />
        </div>
      </motion.div>
    </div>
  );
}

/* ── Section header ───────────────────────────────── */
function Header({ count }) {
  const ref = useScrollReveal();
  return (
    <div className="section-header reveal" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}>
        <span className="section-label">
          <motion.i
            className="fa-solid fa-bolt"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }} />
          What We Do
        </span>

        <h2 className="section-title">
          Services We{' '}
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="svc-title-grad">
            Deliver
          </motion.span>
        </h2>

        <p className="section-sub">
          End-to-end digital solutions built for performance, scale and real-world impact.
        </p>
      </motion.div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────── */
export default function Services({ limit }) {
  const { data, loading } = useFetch(fetchServices);
  const items = limit ? data?.slice(0, limit) : data;

  return (
    <section className="section services-sec" id="services">
      {/* Ambient orbs */}
      <motion.div
        className="svc-bg-orb svc-orb-1"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div
        className="svc-bg-orb svc-orb-2"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Header count={data?.length || 0} />

        {loading ? (
          <div className="services-grid">
            {Array.from({ length: 6 }).map((_, i) => <SkelCard key={i} />)}
          </div>
        ) : items?.length > 0 ? (
          <motion.div
            className="services-grid"
            variants={containerV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}>
            {items.map(s => <ServiceCard key={s._id} service={s} />)}
          </motion.div>
        ) : (
          <motion.div className="empty-state"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <i className="fa-solid fa-layer-group"></i>
            <p>No services yet.</p>
          </motion.div>
        )}

        {limit && data?.length >= limit && (
          <motion.div
            style={{ textAlign: 'center', marginTop: 52 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/services" className="btn btn-outline svc-view-all">
                View All Services&nbsp;<i className="fa-solid fa-arrow-right"></i>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
