import './Skeleton.css';

export const Skeleton = ({ width = '100%', height = '20px', borderRadius = '8px', className = '' }) => (
  <div className={`skeleton ${className}`} style={{ width, height, borderRadius }} />
);

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <Skeleton height="200px" borderRadius="12px" />
    <div style={{ padding: '20px' }}>
      <Skeleton height="18px" width="60%" />
      <Skeleton height="14px" style={{ marginTop: 10 }} />
      <Skeleton height="14px" width="80%" style={{ marginTop: 6 }} />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
  </div>
);

export default Skeleton;
