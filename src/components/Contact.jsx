import { socials } from '../data';
import { BrandIcon, CopyIcon, ExternalIcon } from './icons';
import TiltCard from './TiltCard';
import { copyText, useToast } from './Toast';

export default function Contact() {
  const toast = useToast();

  const onCopy = async (s) => {
    const ok = await copyText(s.copy);
    toast(ok ? `Disalin! ${s.copy}` : 'Gagal menyalin');
  };

  return (
    <section id="kontak" className="section" aria-labelledby="kontak-title">
      <div className="container container--narrow">
        <h2 id="kontak-title" className="section__title section__title--center reveal">
          Kontak saya
        </h2>
        <p className="section__subtitle reveal">
          Punya proyek, ide kolaborasi, atau sekadar ingin ngobrol soal jaringan?
          <br />
          Hubungi saya lewat salah satu kanal di bawah ini.
        </p>

        <ul className="contact__grid">
          {socials.map((s, i) => (
            <li key={s.key} className="reveal" style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}>
              <TiltCard className="contact__card">
                <span className="contact__icon" aria-hidden="true">
                  <BrandIcon name={s.key} size={18} />
                </span>
                <span className="contact__text">
                  {/* Link "melebar" menutupi seluruh kartu */}
                  <a
                    href={s.href}
                    className="contact__link stretched"
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                  <span className="contact__value">{s.value}</span>
                </span>
                {s.copy ? (
                  <button
                    type="button"
                    className="icon-btn contact__action"
                    onClick={() => onCopy(s)}
                    aria-label={`Salin ${s.label}: ${s.copy}`}
                    title="Salin"
                  >
                    <CopyIcon size={16} />
                  </button>
                ) : (
                  <span className="contact__action contact__action--ghost" aria-hidden="true">
                    <ExternalIcon size={15} />
                  </span>
                )}
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
