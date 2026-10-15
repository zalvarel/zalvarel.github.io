import { useState } from 'react';
import { education } from '../data';
import Modal from './Modal';
import TiltCard from './TiltCard';

export default function Education() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="pendidikan" className="section" aria-labelledby="pendidikan-title">
      <div className="container container--narrow">
        <h2 id="pendidikan-title" className="section__title section__title--center reveal">
          Pendidikan
        </h2>

        <div className="edu__grid">
          {education.map((e, i) => (
            <TiltCard
              key={e.id}
              as="article"
              className="edu__card reveal"
              style={{ '--reveal-delay': `${i * 120}ms` }}
            >
              <img
                className="edu__logo"
                src={e.logo}
                alt={e.logoAlt}
                width="64"
                height="64"
                loading="lazy"
              />
              <div>
                <h3 className="card__title">
                  {e.school} <span className="edu__period">({e.period})</span>
                </h3>
                <p className="card__text">{e.major}</p>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => setSelected(e)}
                  aria-haspopup="dialog"
                >
                  Baca lebih lanjut
                  <span className="sr-only"> tentang {e.school}</span>
                </button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} labelledBy="edu-modal-title">
        {selected && (
          <>
            <div className="edu-modal__head">
              <img src={selected.logo} alt="" width="56" height="56" className="edu__logo" />
              <div>
                <h3 id="edu-modal-title" className="modal__title">
                  {selected.school}
                </h3>
                <p className="edu-modal__meta">
                  {selected.period} · {selected.major}
                </p>
              </div>
            </div>
            <ul className="edu-modal__list">
              {selected.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </>
        )}
      </Modal>
    </section>
  );
}
