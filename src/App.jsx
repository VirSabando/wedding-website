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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);


  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* Navigation Bar (sticky) */}
      <nav className="bg-white shadow-md sticky top-0 z-10 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors"
              aria-label="Go to Home"
              title="Go to Home"
            >
              {cvData.name}
            </button>
          </div>

          <div className="flex-1 flex flex-wrap justify-center gap-3 px-4">
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#professional" className="nav-link">Professional Portfolio</a>
            <a href="#scientific" className="nav-link">Scientific Portfolio</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <div className="flex items-center gap-3">
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
      </nav>

      {/* One-page sections */}
      <main className="py-10">
        <section id="home" className="section py-8">
          <Home />
        </section>

        <section id="about" className="section py-8">
          <About />
        </section>

        <section id="experience" className="section py-12">
          <Experience />
        </section>

        <section id="professional" className="section py-12">
          <Professional />
        </section>

        <section id="scientific" className="section py-12">
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