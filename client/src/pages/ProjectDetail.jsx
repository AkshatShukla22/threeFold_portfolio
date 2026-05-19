import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProject } from '../api/index';
import SEOMeta from '../components/common/SEOMeta';
import Loader from '../components/common/Loader';
import CTA from '../components/sections/CTA';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive]   = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchProject(id)
      .then(r => setProject(r.data.data))
      .catch(() => navigate('/projects'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <Loader fullPage />;
  if (!project) return null;

  // Build gallery array — handle both {url,public_id} objects and plain strings
  const gallery = project.images?.length > 0
    ? project.images.map(img => (typeof img === 'string' ? img : img.url))
    : project.thumbnail ? [project.thumbnail] : [];

  return (
    <>
      <SEOMeta title={project.title} description={project.description} />

      <div className="pd-hero">
        <div className="pd-hero-orb"></div>
        <div className="container">
          <Link to="/projects" className="pd-back">
            <i className="fa-solid fa-arrow-left"></i> Back to Projects
          </Link>
          <motion.div className="pd-hero-content"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="pd-meta">
              <span className="pd-category">{project.category}</span>
              {project.featured && <span className="pd-featured">Featured</span>}
            </div>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-desc">{project.description}</p>
            <div className="pd-links">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <i className="fa-brands fa-github"></i> Source Code
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <section className="section pd-body">
        <div className="container">
          <div className="pd-grid">
            {/* Gallery */}
            <div className="pd-gallery">
              {gallery.length > 0 ? (
                <>
                  <div className="pd-main-img">
                    <AnimatePresence mode="wait">
                      <motion.img key={active} src={gallery[active]} alt={project.title}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }} />
                    </AnimatePresence>
                    {gallery.length > 1 && (
                      <>
                        <button className="pd-arrow pd-arrow-l"
                          onClick={() => setActive(a => (a - 1 + gallery.length) % gallery.length)}>
                          <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <button className="pd-arrow pd-arrow-r"
                          onClick={() => setActive(a => (a + 1) % gallery.length)}>
                          <i className="fa-solid fa-chevron-right"></i>
                        </button>
                        <div className="pd-counter">{active + 1} / {gallery.length}</div>
                      </>
                    )}
                  </div>
                  {gallery.length > 1 && (
                    <div className="pd-strip">
                      {gallery.map((img, i) => (
                        <button key={i} className={`pd-strip-btn ${i === active ? 'active' : ''}`}
                          onClick={() => setActive(i)}>
                          <img src={img} alt={`view ${i + 1}`} />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="pd-no-img">
                  <i className="fa-solid fa-image"></i>
                  <span>No images</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="pd-details">
              {project.longDescription && (
                <div className="pd-block">
                  <h2><i className="fa-solid fa-circle-info"></i> About</h2>
                  <p>{project.longDescription}</p>
                </div>
              )}
              <div className="pd-block">
                <h2><i className="fa-solid fa-layer-group"></i> Tech Stack</h2>
                <div className="pd-tags">
                  {project.techStack?.map(t => <span key={t} className="pd-tag">{t}</span>)}
                </div>
              </div>
              <div className="pd-block">
                <h2><i className="fa-solid fa-link"></i> Links</h2>
                <div className="pd-link-list">
                  {project.liveLink
                    ? <a href={project.liveLink} target="_blank" rel="noreferrer" className="pd-link-item">
                        <i className="fa-solid fa-globe"></i><span>Live Website</span>
                        <i className="fa-solid fa-chevron-right" style={{ marginLeft: 'auto', fontSize: '0.7rem', opacity: 0.4 }}></i>
                      </a>
                    : <p className="pd-no-link">No live link</p>}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="pd-link-item">
                      <i className="fa-brands fa-github"></i><span>GitHub Repository</span>
                      <i className="fa-solid fa-chevron-right" style={{ marginLeft: 'auto', fontSize: '0.7rem', opacity: 0.4 }}></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
