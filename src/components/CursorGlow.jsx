import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from '../hooks/useMedia';

/** Glow ungu yang mengikuti mouse (desktop saja, nonaktif bila reduced motion). */
export default function CursorGlow() {
  const finePointer = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    // Gerakan sedikit "tertinggal" (lerp) supaya terasa halus
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.classList.add('is-visible');
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => el.classList.remove('is-visible');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
