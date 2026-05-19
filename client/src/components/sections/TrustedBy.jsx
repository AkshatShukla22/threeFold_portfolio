import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import { fetchSettings } from '../../api/settings.api';
import './TrustedBy.css';

const defaultLogos = [
  'Acme Corp', 'Nexus Labs', 'Orbit Media', 'Fusion Tech', 'Vertex AI', 'PrismWave',
];

const TrustedBy = () => {
  const { data } = useFetch(fetchSettings);
  const logos = data?.trustedByLogos?.length > 0 ? data.trustedByLogos : null;

  return (
    <section className="trustedby-section">
      <div className="container">
        <p className="trustedby-label">Trusted by teams at</p>
        <div className="trustedby-track-wrapper">
          <div className="trustedby-track">
            {logos
              ? [...logos, ...logos].map((l, i) => (
                  <div key={i} className="trustedby-logo">
                    {l.logo ? <img src={l.logo} alt={l.name} /> : <span>{l.name}</span>}
                  </div>
                ))
              : [...defaultLogos, ...defaultLogos].map((name, i) => (
                  <div key={i} className="trustedby-logo">
                    <span>{name}</span>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
