import { cvData } from './data';

export default function Home() {
  return (
    <div className="px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-sm p-6 sm:p-12 border-t-8 border-slate-900">
        <div className="home-grid lg:flex lg:items-center lg:gap-8">
          <div className="flex-shrink-0 mb-6 lg:mb-0">
            <img src="/profile.svg" alt="Profile" className="profile-pic rounded-full shadow-md" />
          </div>

          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              {cvData.name}
            </h1>
            <p className="text-xl text-slate-600 mt-3 font-medium">{cvData.title}</p>
            <p className="text-slate-700 mt-6 leading-relaxed">Welcome — glad you're here. This is my personal page where I share projects, publications, and thoughts on building reliable ML systems and interfaces.</p>
            <p className="text-slate-700 mt-3 leading-relaxed">Browse my work below, learn about my research, or get in touch to collaborate.</p>
            <div className="mt-6 flex gap-3">
              <a href="#contact" className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800">Get in touch</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
