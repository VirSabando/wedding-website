import { useEffect, useState } from 'react';
import Home from './Home';
import WhenWhere from './WhenWhere';
import DressCode from './DressCode';
import ImportantInfo from './ImportantInfo';
import RSVP from './RSVP';
import { weddingData } from './data';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sectionIds = ['home', 'when-where', 'dress-code', 'info', 'rsvp'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const next = visible[0].target.id;
          setActiveSection((cur) => (cur === next ? cur : next));
        }
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'when-where', label: 'When & Where' },
    { id: 'dress-code', label: 'Dress Code' },
    { id: 'info',       label: 'Good to Know' },
    { id: 'rsvp',       label: 'RSVP' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="relative max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          <a
            href="#home"
            className="wedding-heading text-lg text-brown font-semibold hover:opacity-70 transition-opacity"
            style={{ color: 'var(--brown)' }}
          >
            {weddingData.couple.person1} &amp; {weddingData.couple.person2}
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={`nav-link ${activeSection === id ? 'active' : ''}`}>
                {label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden rounded-full border p-2 flex items-center justify-center transition"
            style={{ borderColor: 'var(--border-color)', background: 'var(--surface)', color: 'var(--brown)' }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-nav-menu lg:hidden absolute inset-x-4 top-full mt-2 rounded-2xl border shadow-xl p-4 z-20">
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`nav-link w-full text-left ${activeSection === id ? 'active' : ''}`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </nav>

      {/* Sections */}
      <main>
        <section id="home" className="section">
          <Home />
        </section>

        <section id="when-where" className="section py-16">
          <WhenWhere />
        </section>

        <section id="dress-code" className="section py-16">
          <DressCode />
        </section>

        <section id="info" className="section py-16">
          <ImportantInfo />
        </section>

        <section id="rsvp" className="section py-16">
          <RSVP />
        </section>

        <footer className="py-10 text-center" style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
          <p className="ornament mb-3">✦ ✦ ✦</p>
          <p style={{ textTransform: 'uppercase' }}>
            {weddingData.couple.person1} &amp; {weddingData.couple.person2} · {weddingData.dateDisplay}
          </p>
        </footer>
      </main>
    </div>
  );
}
