import { useEffect, useState } from 'react';
import Home from './Home';
import Experience from './Experience';
import About from './About';
import Professional from './Professional';
import Scientific from './Scientific';
import Blog from './Blog';
import Contact from './Contact';
import { cvData } from './data';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = window.localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sectionIds = ['home', 'about', 'experience', 'professional', 'scientific', 'blog', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* Navigation Bar (sticky) */}
      <nav className="relative bg-white shadow-md sticky top-0 z-10 border-b border-slate-200">
        <div className="relative max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="#home"
              className="text-lg font-medium text-slate-800 hover:text-blue-600 transition-colors"
              aria-label="Go to Home"
              title="Go to Home"
            >
              {cvData.name}
            </a>
          </div>

          <div className="hidden flex-1 min-w-0 lg:flex lg:flex-wrap lg:justify-center lg:gap-3 lg:px-4">
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a>
            <a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a>
            <a href="#professional" className={`nav-link ${activeSection === 'professional' ? 'active' : ''}`}>Professional Portfolio</a>
            <a href="#scientific" className={`nav-link ${activeSection === 'scientific' ? 'active' : ''}`}>Publications & Research</a>
            <a href="#blog" className={`nav-link ${activeSection === 'blog' ? 'active' : ''}`}>Blog</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="theme-toggle rounded-full border p-2 flex items-center justify-center transition lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              title={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => setDarkMode((value) => !value)}
              className="theme-toggle rounded-full border p-2 flex items-center justify-center transition"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" strokeWidth="2" />
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
                  <line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2" />
                  <line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" strokeWidth="2" />
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'} absolute inset-x-4 top-full mt-2 rounded-2xl bg-white/95 border border-slate-200 shadow-xl p-4 z-20`}> 
          <nav className="flex flex-col gap-2">
            <a onClick={() => setMenuOpen(false)} href="#about" className={`nav-link w-full text-left ${activeSection === 'about' ? 'active' : ''}`}>About</a>
            <a onClick={() => setMenuOpen(false)} href="#experience" className={`nav-link w-full text-left ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a>
            <a onClick={() => setMenuOpen(false)} href="#professional" className={`nav-link w-full text-left ${activeSection === 'professional' ? 'active' : ''}`}>Professional Portfolio</a>
            <a onClick={() => setMenuOpen(false)} href="#scientific" className={`nav-link w-full text-left ${activeSection === 'scientific' ? 'active' : ''}`}>Publications & Research</a>
            <a onClick={() => setMenuOpen(false)} href="#blog" className={`nav-link w-full text-left ${activeSection === 'blog' ? 'active' : ''}`}>Blog</a>
            <a onClick={() => setMenuOpen(false)} href="#contact" className={`nav-link w-full text-left ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          </nav>
        </div>
      </nav>

      {/* One-page sections */}
      <main className="py-10">
        <section id="home" className="section py-4">
          <Home />
        </section>

        <section id="about" className="section py-4">
          <About />
        </section>

        <section id="experience" className="section py-12">
          <Experience />
        </section>

        <section id="professional" className="section py-12">
          <Professional />
        </section>

        <section id="scientific" className="section py-8">
          <Scientific />
        </section>

        <section id="blog" className="section py-12">
          <Blog />
        </section>

        <section id="contact" className="section py-12">
          <Contact />
        </section>
      </main>

    </div>
  );
}