import { useEffect } from 'react';
import './Legal.css';

export default function TermsAndConditions() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="container" style={{ position:'relative', zIndex:2, textAlign:'center' }}>
          <span className="section-label"><i className="fa-solid fa-file-contract"></i> Legal</span>
          <h1 className="page-hero-title">Terms &amp; <span>Conditions</span></h1>
          <p className="page-hero-desc">Please read these terms carefully before using our services.</p>
        </div>
      </div>

      <div className="container legal-body">
        <aside className="legal-toc">
          <p className="toc-heading">On this page</p>
          <ul>
            <li><a href="#acceptance">1. Acceptance of Terms</a></li>
            <li><a href="#services">2. Services</a></li>
            <li><a href="#ip">3. Intellectual Property</a></li>
            <li><a href="#payment">4. Payment Terms</a></li>
            <li><a href="#confidentiality">5. Confidentiality</a></li>
            <li><a href="#liability">6. Limitation of Liability</a></li>
            <li><a href="#termination">7. Termination</a></li>
            <li><a href="#governing">8. Governing Law</a></li>
            <li><a href="#changes">9. Changes to Terms</a></li>
            <li><a href="#contact">10. Contact</a></li>
          </ul>
        </aside>

        <article className="legal-content">
          <section id="acceptance">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using any services provided by <strong>ThreeFold Digital</strong> ("we", "us", "our"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
            <p>These terms apply to all clients, visitors, and users who access or use our website and services. Please read them carefully before engaging with us.</p>
          </section>
          <section id="services">
            <h2>2. Services</h2>
            <p>ThreeFold Digital provides digital services including but not limited to:</p>
            <ul>
              <li>Web application development (frontend and backend)</li>
              <li>Mobile application development</li>
              <li>UI/UX design and prototyping</li>
              <li>API development and integration</li>
              <li>Cloud infrastructure and DevOps</li>
              <li>Automation and workflow solutions</li>
            </ul>
            <p>The scope, timeline, and deliverables of each engagement are defined in a separate Statement of Work (SOW) or project agreement agreed upon by both parties prior to commencement.</p>
          </section>
          <section id="ip">
            <h2>3. Intellectual Property</h2>
            <p>Upon receipt of full payment, the client receives full ownership of all custom code, designs, and deliverables produced specifically for their project, unless otherwise stated in the project agreement.</p>
            <p>ThreeFold Digital retains the right to:</p>
            <ul>
              <li>Display completed work in our portfolio (unless client requests confidentiality in writing)</li>
              <li>Retain ownership of any proprietary frameworks, tools, or libraries developed independently</li>
              <li>Use open-source components subject to their respective licenses</li>
            </ul>
            <p>All pre-existing intellectual property brought into a project by ThreeFold Digital remains our property. Clients are granted a perpetual, non-exclusive license to use such components within their delivered product.</p>
          </section>
          <section id="payment">
            <h2>4. Payment Terms</h2>
            <p>Payment schedules are agreed upon in the project proposal. Standard terms include:</p>
            <ul>
              <li>A deposit (typically 30–50%) is required before project work begins</li>
              <li>Milestone-based payments are tied to agreed deliverables</li>
              <li>Final payment is due upon project completion and before final handover</li>
              <li>Invoices are due within 14 days of issuance unless otherwise agreed</li>
            </ul>
            <p>Late payments may incur a fee of 1.5% per month on the outstanding balance. ThreeFold Digital reserves the right to pause work on any project with overdue payments.</p>
          </section>
          <section id="confidentiality">
            <h2>5. Confidentiality</h2>
            <p>Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the engagement. This includes business strategies, technical architectures, user data, pricing, and any information marked as confidential.</p>
            <p>This obligation survives the termination of the agreement and remains in effect for two (2) years after the project concludes, unless a separate NDA specifies otherwise.</p>
          </section>
          <section id="liability">
            <h2>6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, ThreeFold Digital shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to our services.</p>
            <p>Our total liability in any matter is limited to the total fees paid by the client in the three (3) months preceding the claim.</p>
            <p>We do not warrant that our services will be uninterrupted or error-free. We commit to resolving critical issues in a timely manner as part of our warranty period.</p>
          </section>
          <section id="termination">
            <h2>7. Termination</h2>
            <p>Either party may terminate a project engagement with 14 days written notice. Upon termination:</p>
            <ul>
              <li>The client is liable for payment for all work completed up to the termination date</li>
              <li>ThreeFold Digital will deliver all completed work and assets to the client</li>
              <li>Deposits paid for uncompleted milestones may be partially refunded based on work completed</li>
            </ul>
            <p>ThreeFold Digital reserves the right to terminate immediately for abusive behaviour, illegal requests, or unpaid invoices after due notice.</p>
          </section>
          <section id="governing">
            <h2>8. Governing Law</h2>
            <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Madhya Pradesh, India.</p>
          </section>
          <section id="changes">
            <h2>9. Changes to Terms</h2>
            <p>ThreeFold Digital reserves the right to update these Terms at any time. Continued use of our services after changes are posted constitutes acceptance of the revised terms.</p>
          </section>
          <section id="contact">
            <h2>10. Contact</h2>
            <p>For questions about these Terms and Conditions:</p>
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