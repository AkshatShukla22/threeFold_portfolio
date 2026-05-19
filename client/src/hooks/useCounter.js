import { useState, useEffect } from 'react';

const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const numeric = parseInt(target.replace(/\D/g, ''), 10);
    if (!numeric) return;
    const suffix = target.replace(/[0-9]/g, '');
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count || '0';
};

export default useCounter;
