import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { fetchProject } from '../api/index';
import SEOMeta from '../components/common/SEOMeta';
import Loader from '../components/common/Loader';
import CTA from '../components/sections/CTA';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const heroRef  = useRef(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive]   = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY     = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    setLoading(true);
    fetchProject(id)
      .then(r => setProject(r.data.data))
      .catch(() => navigate('/projects'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <Loader fullPage />;
  if (!project) return null;

  const gallery = project.images?.length > 0
    ? project.images.map(img => (typeof img === 'string' ? img : img.url))
    : project.thumbnail ? [project.thumbnail] : [];

  const tech = Array.isArray(project.techStack) ? project.techStack : [];

  return (
    <>
      <SEOMeta title={project.title} description={project.description} />

      {/* ── CINEMATIC HERO ── */}
      <div className="pd-hero" ref={heroRef}>
        {/* Parallax bg image */}
        {gallery[0] && (
          <motion.div className="pd-hero-bg" style={{ y: heroY }}>
            <img src={gallery[0]} alt="" />
            <div className="pd-hero-bg-overlay" />
          </motion.div>
        )}
        <div className="pd-hero-noise" />

        <motion.div className="pd-hero-content container" style={{ opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <Link to="/projects" className="pd-back">
              <i className="fa-solid fa-arrow-left"></i> All Projects
            </Link>
          </motion.div>

          <motion.div className="pd-hero-meta"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}>
            <span className="pd-category-pill">{project.category}</span>
            {project.featured && (
              <span className="pd-featured-pill">
                <i className="fa-solid fa-star"></i> Featured
              </span>
            )}
          </motion.div>

          <motion.h1 className="pd-hero-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}>
            {project.title}
          </motion.h1>

          <motion.p className="pd-hero-desc"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}>
            {project.description}
          </motion.p>

          <motion.div className="pd-hero-actions"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="pd-btn-live">
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="pd-btn-ghost">
                <i className="fa-brands fa-github"></i> Source Code
              </a>
            )}
          </motion.div>

          {/* Scroll hint */}
          <motion.div className="pd-scroll-hint"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}>
            <div className="pd-scroll-mouse"><div className="pd-scroll-wheel" /></div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── TECH STRIP ── */}
      {tech.length > 0 && (
        <div className="pd-tech-strip">
          <div className="container pd-tech-inner">
            <span className="pd-tech-label">Built with</span>
            <div className="pd-tech-tags">
              {tech.map((t, i) => (
                <motion.span key={t} className="pd-tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}>
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN BODY ── */}
      <section className="pd-body">
        <div className="container pd-body-grid">

          {/* LEFT — Gallery + Description */}
          <div className="pd-left">

            {/* Gallery */}
            {gallery.length > 0 ? (
              <motion.div className="pd-gallery"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}>
                <div className="pd-main-img">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active}
                      src={gallery[active]}
                      alt={project.title}
                      onLoad={() => setImgLoaded(true)}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.35 }}
                    />
                  </AnimatePresence>

                  {gallery.length > 1 && (
                    <>
                      <button className="pd-arrow pd-arrow-l"
                        onClick={() => setActive(a => (a - 1 + gallery.length) % gallery.length)}>
                        <i className="fa-solid fa-chevron-left" />
                      </button>
                      <button className="pd-arrow pd-arrow-r"
                        onClick={() => setActive(a => (a + 1) % gallery.length)}>
                        <i className="fa-solid fa-chevron-right" />
                      </button>
                      <div className="pd-img-counter">{active + 1} / {gallery.length}</div>
                    </>
                  )}
                </div>

                {gallery.length > 1 && (
                  <div className="pd-strip">
                    {gallery.map((img, i) => (
                      <button key={i}
                        className={`pd-strip-btn ${i === active ? 'active' : ''}`}
                        onClick={() => setActive(i)}>
                        <img src={img} alt={`view ${i + 1}`} />
                        {i === active && <div className="pd-strip-active-bar" />}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="pd-no-img">
                <i className="fa-solid fa-image" />
                <span>No images available</span>
              </div>
            )}

            {/* Long description */}
            {project.longDescription && (
              <motion.div className="pd-about-block"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}>
                <div className="pd-block-label">
                  <i className="fa-solid fa-circle-info" /> About this project
                </div>
                <p className="pd-about-text">{project.longDescription}</p>
              </motion.div>
            )}
          </div>

          {/* RIGHT — Details sidebar */}
          <aside className="pd-sidebar">

            {/* Links card */}
            <motion.div className="pd-sidebar-card"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="pd-sidebar-title">
                <i className="fa-solid fa-link" /> Project Links
              </div>
              <div className="pd-link-list">
                {project.liveLink ? (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="pd-link-item">
                    <div className="pd-link-icon"><i className="fa-solid fa-globe" /></div>
                    <div className="pd-link-info">
                      <span className="pd-link-name">Live Website</span>
                      <span className="pd-link-url">{project.liveLink.replace(/^https?:\/\//, '')}</span>
                    </div>
                    <i className="fa-solid fa-arrow-up-right-from-square pd-link-arrow" />
                  </a>
                ) : (
                  <div className="pd-link-empty"><i className="fa-solid fa-ban" /> No live link</div>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="pd-link-item">
                    <div className="pd-link-icon pd-link-icon-gh"><i className="fa-brands fa-github" /></div>
                    <div className="pd-link-info">
                      <span className="pd-link-name">GitHub Repo</span>
                      <span className="pd-link-url">{project.githubLink.replace('https://github.com/', '')}</span>
                    </div>
                    <i className="fa-solid fa-arrow-up-right-from-square pd-link-arrow" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Category + featured card */}
            <motion.div className="pd-sidebar-card"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}>
              <div className="pd-sidebar-title">
                <i className="fa-solid fa-tag" /> Details
              </div>
              <div className="pd-detail-rows">
                <div className="pd-detail-row">
                  <span className="pd-detail-key">Category</span>
                  <span className="pd-detail-val pd-category-pill pd-category-pill-sm">{project.category}</span>
                </div>
                <div className="pd-detail-row">
                  <span className="pd-detail-key">Status</span>
                  <span className={`pd-detail-val ${project.featured ? 'pd-status-featured' : 'pd-status-normal'}`}>
                    {project.featured ? '⭐ Featured' : 'Portfolio'}
                  </span>
                </div>
                {project.order !== undefined && (
                  <div className="pd-detail-row">
                    <span className="pd-detail-key">Display Order</span>
                    <span className="pd-detail-val">#{project.order}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Tech stack card */}
            {tech.length > 0 && (
              <motion.div className="pd-sidebar-card"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.26 }}>
                <div className="pd-sidebar-title">
                  <i className="fa-solid fa-layer-group" /> Tech Stack
                </div>
                <div className="pd-tech-grid">
                  {tech.map((t, i) => (
                    <motion.span key={t} className="pd-tech-badge"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.04 }}>
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Back button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <Link to="/projects" className="pd-back-btn">
                <i className="fa-solid fa-arrow-left" /> Back to Projects
              </Link>
            </motion.div>
          </aside>
        </div>
      </section>

      <CTA />
    </>
  );
}