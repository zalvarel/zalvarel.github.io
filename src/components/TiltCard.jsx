import { useRef } from 'react';
import { useFinePointer, useReducedMotion } from '../hooks/useMedia';

const MAX_TILT = 6; // derajat

/**
 * Kartu dengan efek tilt 3D + spotlight yang mengikuti kursor.
 * Efek hanya aktif di perangkat ber-mouse & tanpa reduced motion.
 * Posisi dikirim lewat CSS variable agar tidak memicu re-render React.
 */
export default function TiltCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const finePointer = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    el.style.setProperty('--rx', `${(0.5 - py) * MAX_TILT}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * MAX_TILT}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <Tag
      ref={ref}
      className={`card tilt ${className}`}
      onPointerMove={enabled ? onMove : undefined}
      onPointerLeave={enabled ? onLeave : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
