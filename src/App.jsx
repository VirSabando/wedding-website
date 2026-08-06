import Home from './Home';
import Experience from './Experience';
import About from './About';
import Professional from './Professional';
import Scientific from './Scientific';
import Blog from './Blog';
import Contact from './Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* Navigation Bar (sticky) */}
      <nav className="bg-white shadow-md sticky top-0 z-10 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-4 justify-center items-center font-semibold text-slate-600">
          <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#experience" className="hover:text-blue-600 transition-colors">Experience</a>
          <a href="#professional" className="hover:text-blue-600 transition-colors">Professional</a>
          <a href="#scientific" className="hover:text-blue-600 transition-colors">Scientific Portfolio</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          <a href="#blog" className="hover:text-blue-600 transition-colors">Blog</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
      </nav>

      {/* One-page sections */}
      <main className="py-10">
        <section id="home" className="section py-12">
          <Home />
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

        <section id="about" className="section py-12">
          <About />
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