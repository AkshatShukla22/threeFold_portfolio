import { useEffect, useRef } from 'react';
import './TechStack.css';

const TECH = [
  { name: 'React',        icon: 'devicon-react-original',           color: '#61DAFB' },
  { name: 'Next.js',      icon: 'devicon-nextjs-plain',             color: '#ffffff' },
  { name: 'Node.js',      icon: 'devicon-nodejs-plain',             color: '#68A063' },
  { name: 'Express',      icon: 'devicon-express-original',         color: '#c0c0c0' },
  { name: 'JavaScript',   icon: 'devicon-javascript-plain',         color: '#F7DF1E' },
  { name: 'TypeScript',   icon: 'devicon-typescript-plain',         color: '#3178C6' },
  { name: 'Python',       icon: 'devicon-python-plain',             color: '#3776AB' },
  { name: 'Django',       icon: 'devicon-django-plain',             color: '#44B78B' },
  { name: 'Spring Boot',  icon: 'devicon-spring-plain',             color: '#6DB33F' },
  { name: 'Flutter',      icon: 'devicon-flutter-plain',            color: '#54C5F8' },
  { name: 'HTML',         icon: 'devicon-html5-plain',              color: '#E34F26' },
  { name: 'CSS',          icon: 'devicon-css3-plain',               color: '#1572B6' },
  { name: 'Bootstrap',    icon: 'devicon-bootstrap-plain',          color: '#7952B3' },
  { name: 'Sass',         icon: 'devicon-sass-plain',               color: '#CC6699' },
  { name: 'Tailwind',     icon: 'devicon-tailwindcss-plain',        color: '#38BDF8' },
  { name: 'WordPress',    icon: 'devicon-wordpress-plain',          color: '#21759B' },
  { name: 'AWS',          icon: 'devicon-amazonwebservices-plain',  color: '#FF9900' },
  { name: 'Docker',       icon: 'devicon-docker-plain',             color: '#2496ED' },
  { name: 'Git',          icon: 'devicon-git-plain',                color: '#F05032' },
  { name: 'GitHub',       icon: 'devicon-github-original',          color: '#e0e0e0' },
  { name: 'Linux',        icon: 'devicon-linux-plain',              color: '#FCC624' },
  { name: 'MongoDB',      icon: 'devicon-mongodb-plain',            color: '#47A248' },
  { name: 'MySQL',        icon: 'devicon-mysql-plain',              color: '#4479A1' },
  { name: 'PostgreSQL',   icon: 'devicon-postgresql-plain',         color: '#336791' },
  { name: 'Redis',        icon: 'devicon-redis-plain',              color: '#DC382D' },
  { name: 'GraphQL',      icon: 'devicon-graphql-plain',            color: '#E10098' },
  { name: 'Postman',      icon: 'devicon-postman-plain',            color: '#FF6C37' },
  { name: 'Figma',        icon: 'devicon-figma-plain',              color: '#F24E1E' },
  { name: 'Vercel',       icon: 'devicon-vercel-plain',             color: '#e0e0e0' },
  { name: 'Firebase',     icon: 'devicon-firebase-plain',           color: '#FFCA28' },
];

export default function TechStack() {
  const ringRef  = useRef(null);
  const itemsRef = useRef([]);
  const stateRef = useRef({
    angle: 0,
    speed: 0.002,
    dragging: false,
    lastX: 0,
    lastDX: 0,
    momentum: 0,
    raf: null,
  });

  useEffect(() => {
    const ring = ringRef.current;
    const N    = TECH.length;
    const s    = stateRef.current;
    const els  = itemsRef.current;

    const radius = () => {
      const w = ring.offsetWidth || window.innerWidth;
      return Math.min(w * 0.48, 640);
    };

    const render = () => {
      const r = radius();
      els.forEach((el, i) => {
        if (!el) return;
        const a    = s.angle + i * ((Math.PI * 2) / N);
        const x    = Math.sin(a) * r;
        const z    = Math.cos(a);
        const norm = (z + 1) / 2;
        const sc   = 0.35 + norm * 0.82;
        const op   = 0.04 + norm * 0.96;
        el.style.transform = `translateX(${x}px) scale(${sc})`;
        el.style.opacity   = op;
        el.style.zIndex    = Math.round(norm * 100);
      });
    };

    const loop = () => {
      if (!s.dragging) {
        s.angle   += s.speed + s.momentum;
        s.momentum *= 0.92;
        if (Math.abs(s.momentum) < 0.00004) s.momentum = 0;
      }
      render();
      s.raf = requestAnimationFrame(loop);
    };

    const onMouseDown = (e) => { s.dragging = true; s.lastX = e.clientX; s.lastDX = 0; };
    const onMouseMove = (e) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      s.lastX = e.clientX; s.lastDX = dx;
      s.angle += dx * 0.003; render();
    };
    const onMouseUp = () => {
      if (!s.dragging) return;
      s.dragging = false; s.momentum = s.lastDX * 0.003;
    };
    const onTouchStart = (e) => { s.dragging = true; s.lastX = e.touches[0].clientX; s.lastDX = 0; };
    const onTouchMove  = (e) => {
      if (!s.dragging) return;
      const dx = e.touches[0].clientX - s.lastX;
      s.lastX = e.touches[0].clientX; s.lastDX = dx;
      s.angle += dx * 0.003; render();
    };
    const onTouchEnd = () => {
      if (!s.dragging) return;
      s.dragging = false; s.momentum = s.lastDX * 0.003;
    };

    ring.addEventListener('mousedown',   onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    ring.addEventListener('touchstart',  onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove,  { passive: true });
    window.addEventListener('touchend',  onTouchEnd);

    loop();

    return () => {
      cancelAnimationFrame(s.raf);
      ring.removeEventListener('mousedown',   onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
      ring.removeEventListener('touchstart',  onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend',  onTouchEnd);
    };
  }, []);

  return (
    <section className="section tech-sec">

      <div className="tech-heading-wrap">
        <span className="section-label">
          <i className="fa-solid fa-microchip"></i>&nbsp;Tech We Use
        </span>
        <h2 className="section-title">
          Our <span>Technology Stack</span>
        </h2>
      </div>

      <div className="tech-carousel" ref={ringRef}>
        {TECH.map((t, i) => (
          <div
            key={i}
            className="tech-item"
            style={{ '--brand': t.color }}
            ref={el => (itemsRef.current[i] = el)}
          >
            <i className={`${t.icon} colored`}></i>
            <span className="tech-label">{t.name}</span>
          </div>
        ))}
      </div>

      <p className="tech-hint">
        <i className="fa-solid fa-left-right"></i>&nbsp;&nbsp;Drag to explore
      </p>

    </section>
  );
}