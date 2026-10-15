import { useEffect, useState } from 'react';
import { bootLines } from '../data';
import { prefersReducedMotion } from '../hooks/useMedia';

const KEY = 'wz-booted';
const LINE_MS = 260; // jeda antar baris
const TOTAL_MS = 1400; // total < 1,5 detik
const FADE_MS = 250;

const alreadyBooted = () => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

// Di HP/tablet (layar sentuh atau layar kecil) loading screen tidak ditampilkan
const isMobile = () => window.matchMedia('(hover: none), (max-width: 820px)').matches;

/** Loading screen ala boot sequence. Sekali per sesi, bisa di-skip, hanya di desktop. */
export default function BootScreen() {
  const [show, setShow] = useState(() => !isMobile() && !alreadyBooted());
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage diblokir: tidak masalah */
    }

    const reduced = prefersReducedMotion();
    const timers = [];
    const finish = () => {
      setLeaving(true);
      timers.push(setTimeout(() => setShow(false), FADE_MS));
    };

    if (reduced) {
      setCount(bootLines.length);
      timers.push(setTimeout(finish, 600));
    } else {
      bootLines.forEach((_, i) => timers.push(setTimeout(() => setCount(i + 1), (i + 1) * LINE_MS)));
      timers.push(setTimeout(finish, TOTAL_MS - FADE_MS));
    }

    // Skip: klik / tekan tombol apa saja
    const skip = () => {
      timers.forEach(clearTimeout);
      finish();
    };
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('pointerdown', skip, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <div className={`boot${leaving ? ' is-leaving' : ''}`} role="status" aria-label="Memuat portofolio">
      <div className="boot__box">
        {bootLines.slice(0, count).map((l) => (
          <p key={l} className="boot__line">
            <span className="boot__ok">{l.slice(0, 8)}</span>
            {l.slice(8)}
          </p>
        ))}
        <p className="boot__line boot__cursor" aria-hidden="true">
          _
        </p>
        <div className="boot__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${count / bootLines.length})` }} />
        </div>
        <p className="boot__hint">Tekan tombol apa saja untuk melewati</p>
      </div>
    </div>
  );
}
