import { education } from '../data';
import { ExternalIcon } from './icons';
import TiltCard from './TiltCard';

export default function Education() {
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
                <a
                  href={e.website}
                  className="btn btn--ghost btn--sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Baca lebih lanjut
                  <span className="sr-only"> tentang {e.school} (membuka website di tab baru)</span>
                  <ExternalIcon size={13} />
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
