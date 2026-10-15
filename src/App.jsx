import { useEffect } from 'react';
import BootScreen from './components/BootScreen';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ToastProvider } from './components/Toast';

/** Scroll reveal: tambahkan class `is-visible` ke setiap `.reveal` saat terlihat. */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  return (
    <ToastProvider>
      <BootScreen />
      <a href="#main" className="skip-link">
        Langsung ke konten
      </a>
      <CursorGlow />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Education />
        <Experience />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </ToastProvider>
  );
}
