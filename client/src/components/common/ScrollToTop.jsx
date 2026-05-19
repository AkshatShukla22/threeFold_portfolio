import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top:0, behavior:'smooth' }); }, [pathname]);
  return null;
}

export function SEOMeta({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | ThreeFold Digital` : 'ThreeFold Digital — Designing · Development · Automation';
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', description || 'ThreeFold Digital — Full-stack software agency.');
  }, [title, description]);
  return null;
}

export default ScrollToTop;
