import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProjects } from '../../api/index';
import { useScrollReveal } from '../../hooks/index';
import './Projects.css';

const ProjectCard = ({ project, index }) => (
  <motion.div layout className="proj-card"
    initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
    exit={{ opacity:0, scale:0.95 }} transition={{ duration:0.3, delay: index * 0.05 }}>
    <div className="proj-thumb">
      {project.thumbnail
        ? <img src={project.thumbnail} alt={project.title} loading="lazy" />
        : <div className="proj-thumb-ph"><i className="fa-solid fa-image"></i></div>}
      <div className="proj-overlay">
        {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="proj-ov-btn"><i className="fa-solid fa-arrow-up-right-from-square"></i> Live</a>}
        {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="proj-ov-btn proj-ov-outline"><i className="fa-brands fa-github"></i> Code</a>}
      </div>
      {project.featured && <span className="proj-featured">Featured</span>}
      <span className="proj-cat">{project.category}</span>
      {/* Image count badge */}
      {project.images?.length > 1 && <span className="proj-img-count"><i className="fa-solid fa-images"></i> {project.images.length}</span>}
    </div>
    <div className="proj-body">
      <h3 className="proj-title">{project.title}</h3>
      <p className="proj-desc">{project.description}</p>
      <div className="proj-tech">
        {project.techStack?.slice(0,4).map(t => <span key={t} className="proj-tech-tag">{t}</span>)}
        {project.techStack?.length > 4 && <span className="proj-tech-tag">+{project.techStack.length-4}</span>}
      </div>
      <Link to={`/projects/${project._id}`} className="btn btn-ghost">
        View Details <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </div>
  </motion.div>
);

export default function Projects({ limit, showFilters }) {
  const [projects, setProjects]   = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [category, setCategory]   = useState('All');
  const [search, setSearch]       = useState('');
  const [cats, setCats]           = useState(['All']);
  const ref = useScrollReveal();

  useEffect(() => {
    setLoading(true);
    fetchProjects().then(r => {
      const data = r.data.data;
      setProjects(data);
      setCats(['All', ...new Set(data.map(p => p.category).filter(Boolean))]);
    }).catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  useEffect(() => {
    let res = [...projects];
    if (category !== 'All') res = res.filter(p => p.category === category);
    if (search.trim()) res = res.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (limit) res = res.slice(0, limit);
    setFiltered(res);
  }, [projects, category, search, limit]);

  return (
    <section className="section projects-sec" id="projects">
      <div className="container">
        {!showFilters && (
          <div className="section-header reveal" ref={ref}>
            <span className="section-label"><i className="fa-solid fa-briefcase"></i>Our Portfolio</span>
            <h2 className="section-title">Projects We're <span>Proud Of</span></h2>
            <p className="section-sub">From SaaS platforms to e-commerce — work that speaks for itself.</p>
          </div>
        )}

        {showFilters && (
          <div className="proj-controls">
            <div className="proj-filters">
              {cats.map(c => (
                <button key={c} className={`proj-filter-btn ${category===c?'active':''}`} onClick={()=>setCategory(c)}>{c}</button>
              ))}
            </div>
            <div className="proj-search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input placeholder="Search projects..." value={search} onChange={e=>setSearch(e.target.value)} />
              {search && <button onClick={()=>setSearch('')}><i className="fa-solid fa-xmark"></i></button>}
            </div>
          </div>
        )}

        {loading ? (
          <div className="skeleton-grid">
            {Array.from({length:limit||6}).map((_,i) => (
              <div key={i} className="skeleton-card"><div className="skeleton" style={{height:200}}></div><div style={{padding:20}}><div className="skeleton" style={{height:16,width:'60%'}}></div><div className="skeleton" style={{height:12}}></div></div></div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div layout className="proj-grid">
            <AnimatePresence>
              {filtered.map((p,i) => <ProjectCard key={p._id} project={p} index={i} />)}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="empty-state"><i className="fa-solid fa-folder-open"></i><p>No projects match.</p></div>
        )}

        {limit && projects.length > limit && (
          <div style={{textAlign:'center',marginTop:44}}>
            <Link to="/projects" className="btn btn-outline">View All Projects <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
        )}
      </div>
    </section>
  );
}
