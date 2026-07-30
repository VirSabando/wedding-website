import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Resume from './Resume';
import About from './About';
import Portfolio from './Portfolio';
import Scientific from './Scientific';
import Contact from './Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md sticky top-0 z-10 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-4 justify-center sm:justify-start font-semibold text-slate-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Resume</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
            <Link to="/portfolio" className="hover:text-blue-600 transition-colors">Web Portfolio</Link>
            <Link to="/scientific" className="hover:text-blue-600 transition-colors">Scientific Portfolio</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
        </nav>

        {/* Page Content */}
        <main className="py-10">
          <Routes>
            <Route path="/" element={<Resume />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/scientific" element={<Scientific />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}