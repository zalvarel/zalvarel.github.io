import { hero, profile, stats } from '../data';
import NetworkCanvas from './NetworkCanvas';
import TypingText from './TypingText';
import Counter from './Counter';

export default function Hero() {
  return (
    <section id="beranda" className="hero" aria-labelledby="hero-name">
      {/* Background topologi jaringan */}
      <NetworkCanvas />

      <div className="container hero__inner">
        <div className="hero__photo reveal" data-reveal="left">
          <div className="hero__photo-glow" aria-hidden="true" />
          <img
            src={profile.photo}
            alt={profile.photoAlt}
            width="840"
            height="1040"
            fetchPriority="high"
          />
        </div>

        <div className="hero__text">
          <p className="hero__greeting reveal">{hero.greeting}</p>
          <h1 id="hero-name" className="hero__name reveal">
            {profile.name}
          </h1>
          <p className="hero__role reveal">
            <TypingText words={hero.roles} />
          </p>
          <p className="hero__desc reveal">{hero.description}</p>
          <a href={`#${hero.cta.target}`} className="btn btn--primary reveal">
            {hero.cta.label}
          </a>

          <ul className="stats reveal" aria-label="Statistik singkat">
            {stats.map((s) => (
              <li key={s.label} className="stats__item">
                <span className="stats__value">
                  <Counter to={s.value} />
                  {s.suffix}
                </span>
                <span className="stats__label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
