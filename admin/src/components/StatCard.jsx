import './StatCard.css';

const StatCard = ({ icon, label, value, color = 'primary', loading }) => (
  <div className={`stat-card stat-card-${color}`}>
    <div className="stat-card-icon"><i className={icon}></i></div>
    <div className="stat-card-body">
      <span className="stat-card-label">{label}</span>
      {loading
        ? <div className="stat-card-skeleton"></div>
        : <span className="stat-card-value">{value ?? '—'}</span>
      }
    </div>
  </div>
);

export default StatCard;
