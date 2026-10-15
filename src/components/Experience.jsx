import { useEffect, useRef, useState } from 'react';
import { experiences } from '../data';
import Modal from './Modal';
import TiltCard from './TiltCard';
import { ZoomIcon } from './icons';

const TRIGGER = 0.6; // garis "pengisi" berada di 60% tinggi layar

/** Timeline zig-zag: garis tengah terisi saat scroll, foto bisa dibuka di lightbox. */
export default function Experience() {
  const timelineRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const el = timelineRef.current;
    const items = [...el.querySelectorAll('.tl-item')];
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max((vh * TRIGGER - rect.top) / rect.height, 0), 1);
      el.style.setProperty('--progress', progress.toFixed(4));
      // Titik timeline menyala saat garis sudah melewatinya
      items.forEach((item) => {
        const dot = item.querySelector('.tl-dot');
        const r = dot.getBoundingClientRect();
        item.classList.toggle('is-passed', r.top + r.height / 2 < vh * TRIGGER);
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="pengalaman" className="section" aria-labelledby="pengalaman-title">
      <div className="container container--narrow">
        <h2 id="pengalaman-title" className="section__title section__title--center reveal">
          Pengalaman
        </h2>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline__line" aria-hidden="true">
            <div className="timeline__fill" />
          </div>

          <ol className="timeline__list">
            {experiences.map((exp, i) => (
              <li key={exp.id} className={`tl-item ${i % 2 ? 'tl-item--flip' : ''}`}>
                <span className="tl-dot" aria-hidden="true" />

                <div className="tl-text reveal" data-reveal={i % 2 ? 'right' : 'left'}>
                  <p className="tl-type">
                    {exp.type} · {exp.duration}
                  </p>
                  <h3 className="tl-company">{exp.company}</h3>
                  <TiltCard className="tl-card">
                    <p className="tl-role">{exp.role}</p>
                    <p className="card__text">{exp.description}</p>
                    <ul className="tags" aria-label="Fokus pekerjaan">
                      {exp.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </TiltCard>
                </div>

                <div className="tl-photo reveal" data-reveal={i % 2 ? 'left' : 'right'}>
                  <button
                    type="button"
                    className="tl-photo__btn"
                    onClick={() => setLightbox(exp)}
                    aria-label={`Perbesar foto: ${exp.photoAlt}`}
                  >
                    <img src={exp.photo} alt={exp.photoAlt} width="640" height="400" loading="lazy" />
                    <span className="tl-photo__zoom" aria-hidden="true">
                      <ZoomIcon size={20} />
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Lightbox */}
      <Modal
        open={!!lightbox}
        onClose={() => setLightbox(null)}
        labelledBy="lightbox-caption"
        className="lightbox"
      >
        {lightbox && (
          <figure className="lightbox__figure">
            <img src={lightbox.photo} alt={lightbox.photoAlt} />
            <figcaption id="lightbox-caption">
              <strong>{lightbox.company}</strong> · {lightbox.photoAlt}
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  );
}
