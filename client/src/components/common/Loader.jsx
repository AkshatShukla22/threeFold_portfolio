import './Loader.css';
export default function Loader({ fullPage }) {
  return (
    <div className={`loader ${fullPage ? 'loader-full' : ''}`}>
      <div className="loader-ring"><div></div><div></div><div></div></div>
    </div>
  );
}
