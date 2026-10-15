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

        <div
          className={`orbit reveal${active !== null ? ' has-active' : ''}`}
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
          />

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
                    onPointerEnter={() => setActive(i)}
                    onPointerLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive((a) => (a === i ? null : i))}
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
    </section>
  );
}
