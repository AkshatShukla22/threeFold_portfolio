import { useEffect } from 'react';
import './Legal.css';

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="container" style={{ position:'relative', zIndex:2, textAlign:'center' }}>
          <span className="section-label"><i className="fa-solid fa-shield-halved"></i> Legal</span>
          <h1 className="page-hero-title">Privacy <span>Policy</span></h1>
          <p className="page-hero-desc">How we collect, use and protect your personal information.</p>
        </div>
      </div>

      <div className="container legal-body">
        <aside className="legal-toc">
          <p className="toc-heading">On this page</p>
          <ul>
            <li><a href="#intro">1. Introduction</a></li>
            <li><a href="#collect">2. Information We Collect</a></li>
            <li><a href="#use">3. How We Use Your Data</a></li>
            <li><a href="#sharing">4. Data Sharing</a></li>
            <li><a href="#cookies">5. Cookies</a></li>
            <li><a href="#retention">6. Data Retention</a></li>
            <li><a href="#security">7. Security</a></li>
            <li><a href="#rights">8. Your Rights</a></li>
            <li><a href="#third">9. Third-Party Links</a></li>
            <li><a href="#changes">10. Policy Changes</a></li>
            <li><a href="#contact">11. Contact</a></li>
          </ul>
        </aside>

        <article className="legal-content">
          <section id="intro">
            <h2>1. Introduction</h2>
            <p><strong>ThreeFold Digital</strong> is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.</p>
            <p>By using our website or services, you consent to the practices described in this policy.</p>
          </section>
          <section id="collect">
            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, and company name when you fill out our contact form or engage our services</li>
              <li><strong>Project Information:</strong> Details about your project requirements, technical specifications, and business goals</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and referring URLs collected automatically</li>
              <li><strong>Communications:</strong> Emails, messages, and other communications you send us</li>
              <li><strong>Payment Information:</strong> Billing details processed through secure payment partners (we do not store card numbers)</li>
            </ul>
          </section>
          <section id="use">
            <h2>3. How We Use Your Data</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to inquiries and provide requested services</li>
              <li>Communicate about project progress, updates, and deliverables</li>
              <li>Process payments and send invoices</li>
              <li>Improve our website, services, and user experience</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
            <p>We do <strong>not</strong> sell your personal data to third parties or use it for unsolicited marketing without your explicit consent.</p>
          </section>
          <section id="sharing">
            <h2>4. Data Sharing</h2>
            <p>We may share your information with trusted third parties only as necessary:</p>
            <ul>
              <li><strong>Service Providers:</strong> Hosting providers, cloud platforms (e.g. AWS, Cloudinary), and communication tools</li>
              <li><strong>Payment Processors:</strong> Secure, PCI-compliant payment gateways</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
            </ul>
            <p>All third-party providers are contractually required to protect your data.</p>
          </section>
          <section id="cookies">
            <h2>5. Cookies</h2>
            <p>Our website may use cookies to enhance your experience — to remember preferences, understand site interactions, and improve performance. You can control cookies through your browser settings. We do not use cookies to track you across third-party websites.</p>
          </section>
          <section id="retention">
            <h2>6. Data Retention</h2>
            <p>We retain personal data only as long as necessary:</p>
            <ul>
              <li>Contact form submissions: up to 2 years</li>
              <li>Project-related data: project duration plus 3 years</li>
              <li>Payment records: as required by Indian tax law (typically 7 years)</li>
            </ul>
          </section>
          <section id="security">
            <h2>7. Security</h2>
            <p>We implement appropriate technical and organisational measures including HTTPS encryption, secure cloud infrastructure, regular security reviews, and restricted access on a need-to-know basis. No method of internet transmission is 100% secure.</p>
          </section>
          <section id="rights">
            <h2>8. Your Rights</h2>
            <p>You have the right to access, correct, delete, object to, or request portability of your personal data. To exercise any right, contact us at <a href="mailto:hello@threefold.dev" style={{color:'#60A5FA'}}>hello@threefold.dev</a>. We will respond within 30 days.</p>
          </section>
          <section id="third">
            <h2>9. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies.</p>
          </section>
          <section id="changes">
            <h2>10. Policy Changes</h2>
            <p>We may update this Privacy Policy from time to time. Significant changes will be posted on this page with an updated effective date. Continued use of our services constitutes acceptance of the revised policy.</p>
          </section>
          <section id="contact">
            <h2>11. Contact</h2>
            <p>For questions about this Privacy Policy or your personal data:</p>
            <div className="legal-contact-box">
              <p>
                <strong>ThreeFold Digital</strong><br />
                SAKET COLONY, Narmadapuram, Madhya Pradesh, India<br />
                Email: <a href="mailto:hello@threefold.dev">hello@threefold.dev</a><br />
                Phone: <a href="tel:+919340924251">+91 93409 24251</a>
              </p>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}