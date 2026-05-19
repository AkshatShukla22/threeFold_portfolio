import SEOMeta from '../components/common/SEOMeta';
import ContactSection from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';

export default function ContactPage() {
  return (
    <>
      <SEOMeta title="Contact" description="Get in touch with ThreeFold Digital. Let's build something great together." />
      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="container" style={{ position:'relative', zIndex:2, textAlign:'center' }}>
          <span className="section-label"><i className="fa-solid fa-paper-plane"></i>Contact Us</span>
          <h1 className="page-hero-title">Let's <span>Connect</span></h1>
          <p className="page-hero-desc">Have a project, a question, or just want to say hello? We'd love to hear from you.</p>
        </div>
      </div>
      <ContactSection />
      <FAQ />
    </>
  );
}
