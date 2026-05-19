import SEOMeta from '../components/common/SEOMeta';
import ProjectsSection from '../components/sections/Projects';
import CTA from '../components/sections/CTA';

export default function ProjectsPage() {
  return (
    <>
      <SEOMeta title="Projects" description="Browse our portfolio of web apps, mobile apps and SaaS platforms." />
      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="container" style={{ position:'relative', zIndex:2, textAlign:'center' }}>
          <span className="section-label"><i className="fa-solid fa-briefcase"></i>Portfolio</span>
          <h1 className="page-hero-title">Our <span>Projects</span></h1>
          <p className="page-hero-desc">A curated selection of work spanning industries — from SaaS to e-commerce to mobile.</p>
        </div>
      </div>
      <ProjectsSection showFilters={true} />
      <CTA />
    </>
  );
}
