import { useEffect, useState } from 'react';

/** Mengembalikan true/false sesuai media query, ikut update saat berubah. */
export function useMediaQuery(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [matches, setMatches] = useState(get);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Perangkat dengan mouse (bukan layar sentuh). */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

/** Versi non-hook untuk dipakai di luar komponen. */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
