import SEOMeta from '../components/common/SEOMeta';
import ServicesSection from '../components/sections/Services';
import CTA from '../components/sections/CTA';
import './PageHero.css';

export default function ServicesPage() {
  return (
    <>
      <SEOMeta title="Services" description="Explore our full-stack development, mobile, UI/UX, DevOps and automation services." />
      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="container" style={{ position:'relative', zIndex:2, textAlign:'center' }}>
          <span className="section-label"><i className="fa-solid fa-bolt"></i>What We Offer</span>
          <h1 className="page-hero-title">Our <span>Services</span></h1>
          <p className="page-hero-desc">End-to-end digital solutions built with modern technology and real-world expertise.</p>
        </div>
      </div>
      <ServicesSection />
      <CTA />
    </>
  );
}
