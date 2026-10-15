import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data';
import { CloseIcon, MenuIcon } from './icons';

/** Navbar sticky: blur saat scroll, highlight section aktif, hamburger di mobile. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(navLinks[0].id);
  const [open, setOpen] = useState(false);

  // Efek blur/latar saat halaman di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section aktif = section terakhir yang bagian atasnya sudah melewati 40% tinggi layar
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.4;
      let current = navLinks[0].id;
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Paling bawah halaman → section terakhir
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = navLinks[navLinks.length - 1].id;
      }
      setActive(current);
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

  // Menu mobile: tutup dengan Escape, kunci scroll body saat terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open]);

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <nav className="navbar__inner container" aria-label="Navigasi utama">
        <a href="#beranda" className="navbar__logo" onClick={() => setOpen(false)}>
          {profile.logo}
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>

        <ul id="nav-menu" className="navbar__links">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'is-active' : undefined}
                aria-current={active === id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {open && <div className="navbar__backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
    </header>
  );
}
