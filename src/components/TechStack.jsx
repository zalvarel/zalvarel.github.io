import { useId, useState } from 'react';
import { techStack } from '../data';
import { useMediaQuery } from '../hooks/useMedia';
import { BrandIcon } from './icons';

/* Hitung posisi ikon & bola dalam koordinat viewBox SVG.
 * Ikon (HTML) diposisikan dengan persen dari koordinat yang sama,
 * jadi garis SVG dan ikon selalu pas di semua ukuran layar. */
function computeLayout(cols) {
  const rows = Math.ceil(techStack.length / cols);
  const W = cols * 100;
  const rowGap = 85;
  const lastRowY = 45 + (rows - 1) * rowGap;
  const orb = { x: W / 2, y: lastRowY + 230 };
  const H = orb.y + 110;
  const icons = techStack.map((t, i) => ({
    ...t,
    col: i % cols,
    x: 50 + (i % cols) * 100,
    y: 45 + Math.floor(i / cols) * rowGap,
  }));
  return { W, H, orb, icons, cols };
}

// Kurva dari bawah ikon ke puncak bola
const curve = ({ x, y }, orb) => {
  const y0 = y + 24;
  const y1 = orb.y - 56;
  const midY = (y0 + y1) / 2;
  return `M ${x} ${y0} C ${x} ${midY}, ${orb.x + (x - orb.x) * 0.25} ${midY}, ${orb.x + (x - orb.x) * 0.15} ${y1}`;
};

/** Logo otak bergaya hologram (garis neon + node sirkuit + scanline). */
function BrainHologram() {
  return (
    <div className="holo">
      <svg viewBox="0 0 64 64" className="holo__svg">
        <g className="holo__lines">
          {/* Belahan kiri */}
          <path d="M31 13c-2.5-3.2-8.2-3.4-10.4.4-4-.9-7.9 1.9-8 5.9-3.2 1.2-4.9 5-3.3 8.3-2.4 2.3-2.4 6.3 0 8.5-1.2 4 1.6 8 5.7 8.4.9 3.3 4.6 5.5 8 4.6 2.2 2.4 6 2.6 8 .4V13z" />
          {/* Belahan kanan */}
          <path d="M33 13c2.5-3.2 8.2-3.4 10.4.4 4-.9 7.9 1.9 8 5.9 3.2 1.2 4.9 5 3.3 8.3 2.4 2.3 2.4 6.3 0 8.5 1.2 4-1.6 8-5.7 8.4-.9 3.3-4.6 5.5-8 4.6-2.2 2.4-6 2.6-8 .4V13z" />
          {/* Lipatan otak (gyri) */}
          <path d="M20.6 13.4c1.3 2.2 4 3 6.2 2.1M12.6 19.3c2.4.3 4.4 2 5 4.3M9.3 27.6c2.6-.6 5.2.6 6.4 2.9M9.3 36.1c2.4.5 4.7-.4 6-2.4M15 44.5c.6-2.5 2.6-4.3 5.1-4.6M23 49c-.3-2.4.9-4.8 3-6M24 22c2.6 0 5 1.6 6 4M20 31c2.8-.4 5.6 1 7 3.4" />
          <path d="M43.4 13.4c-1.3 2.2-4 3-6.2 2.1M51.4 19.3c-2.4.3-4.4 2-5 4.3M54.7 27.6c-2.6-.6-5.2.6-6.4 2.9M54.7 36.1c-2.4.5-4.7-.4-6-2.4M49 44.5c-.6-2.5-2.6-4.3-5.1-4.6M41 49c.3-2.4-.9-4.8-3-6M40 22c-2.6 0-5 1.6-6 4M44 31c-2.8-.4-5.6 1-7 3.4" />
        </g>
        {/* Node sirkuit */}
        <g className="holo__nodes">
          <circle cx="24" cy="22" r="1.4" />
          <circle cx="20" cy="31" r="1.4" />
          <circle cx="40" cy="22" r="1.4" />
          <circle cx="44" cy="31" r="1.4" />
          <circle cx="32" cy="30" r="1.8" />
          <circle cx="26.5" cy="41" r="1.2" />
          <circle cx="37.5" cy="41" r="1.2" />
        </g>
      </svg>
      <span className="holo__scan" />
    </div>
  );
}

export default function TechStack() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { W, H, orb, icons, cols } = computeLayout(isMobile ? 4 : 6);
  const [active, setActive] = useState(null);
  const uid = useId();

  return (
    <section className="section techstack" aria-labelledby="tech-title">
      <div className="container">
        <h2 id="tech-title" className="section__title section__title--center reveal">
          Tech stack
        </h2>
        <p className="section__subtitle reveal">
          Tools yang saya pakai sehari-hari, semua terhubung ke satu tujuan: belajar terus.
        </p>

        {/* Wrapper reveal terpisah: React tidak boleh menimpa class `is-visible`
            yang ditambahkan IntersectionObserver saat className orbit berubah. */}
        <div className="reveal">
        <div
          className={`orbit${active !== null ? ' has-active' : ''}`}
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          <svg className="orbit__svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <defs>
              <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#a78bfa" stopOpacity="0.05" />
                <stop offset="1" stopColor="#a78bfa" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Cincin orbit di sekitar bola */}
            {[1, 1.45, 1.9].map((s) => (
              <ellipse
                key={s}
                className="orbit__ring"
                cx={orb.x}
                cy={orb.y}
                rx={110 * s * (isMobile ? 0.9 : 1)}
                ry={26 * s}
              />
            ))}

            {icons.map((ic, i) => {
              const d = curve(ic, orb);
              return (
                <g key={ic.name} className={`orbit__link${active === i ? ' is-active' : ''}`}>
                  <path d={d} className="orbit__line" stroke={`url(#${uid}-line)`} />
                  {/* "Paket data" yang mengalir ke bola */}
                  <path
                    d={d}
                    pathLength="100"
                    className="orbit__packet"
                    style={{ animationDelay: `${(i * 0.37) % 2.4}s` }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Bola ungu */}
          <div
            className="orbit__orb"
            style={{ left: `${(orb.x / W) * 100}%`, top: `${(orb.y / H) * 100}%` }}
            aria-hidden="true"
          >
            <BrainHologram />
          </div>

          {/* Ikon tools */}
          <ul className="orbit__icons" aria-label="Daftar tools">
            {icons.map((ic, i) => {
              const tipId = `${uid}-tip-${i}`;
              const edge = ic.col === 0 ? ' is-left' : ic.col === cols - 1 ? ' is-right' : '';
              return (
                <li
                  key={ic.name}
                  className={`orbit__item${active === i ? ' is-active' : ''}${edge}`}
                  style={{ left: `${(ic.x / W) * 100}%`, top: `${(ic.y / H) * 100}%` }}
                >
                  <button
                    type="button"
                    className="orbit__icon"
                    aria-label={ic.name}
                    aria-describedby={tipId}
                    // Hover hanya untuk mouse; di layar sentuh pointerleave terpicu setelah tap
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                    onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(i)} // klik/tap tetap menampilkan tooltip
                  >
                    <BrandIcon name={ic.icon} size={22} colored />
                  </button>
                  <span role="tooltip" id={tipId} className="orbit__tip">
                    <strong>{ic.name}</strong>
                    <span>{ic.level}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        </div>
      </div>
    </section>
  );
}
