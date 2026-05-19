import { useState, useEffect, useRef } from 'react';

export const useFetch = (apiFn, deps = []) => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  useEffect(() => {
    let c = false;
    setLoading(true);
    apiFn().then(r => { if(!c) setData(r.data.data) })
           .catch(e => { if(!c) setError(e.response?.data?.message || 'Error') })
           .finally(() => { if(!c) setLoading(false) });
    return () => { c = true };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return { data, loading, error };
};

export const useScrollReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

export const useCounter = (target, duration = 2000, active = false) => {
  const [count, setCount] = useState('0');
  useEffect(() => {
    if (!active) return;
    const numeric = parseInt((target + '').replace(/\D/g, ''), 10);
    if (!numeric) return;
    const suffix = (target + '').replace(/[0-9]/g, '');
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * numeric) + suffix);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
};
