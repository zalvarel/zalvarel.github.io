import { about, socials } from '../data';
import { BrandIcon } from './icons';
import TiltCard from './TiltCard';

export default function About() {
  return (
    <section id="tentang" className="section" aria-labelledby="tentang-title">
      <div className="container">
        <h2 id="tentang-title" className="section__title reveal">
          {about.title}
        </h2>

        <div className="about__grid">
          <TiltCard className="about__card reveal">
            <h3 className="card__title">{about.intro.heading}</h3>
            <p className="card__text">{about.intro.body}</p>
          </TiltCard>

          <TiltCard className="about__card reveal" style={{ '--reveal-delay': '120ms' }}>
            <h3 className="card__title">{about.connect.heading}</h3>
            <p className="card__text">{about.connect.body}</p>
            <ul className="social-row" aria-label="Media sosial">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    className="icon-btn"
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={`${s.label}: ${s.value}`}
                    title={s.label}
                  >
                    <BrandIcon name={s.key} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
