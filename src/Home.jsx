import { cvData, homeContent } from './data';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="p-4 sm:p-6">
        <div className="home-grid lg:grid lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex-shrink-0 mb-4 lg:mb-0">
            <img src="/profile.png" alt="Profile" className="profile-pic rounded-full shadow-md" />
          </div>

          <div className="text-left">
            <div className="flex items-baseline gap-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                {cvData.name}
              </h1>
              <p className="text-sm text-slate-500">{cvData.pronouns}</p>
            </div>
            <p className="text-xl text-slate-600 mt-3 font-medium">{cvData.title}</p>
            <p className="text-slate-700 mt-6 leading-relaxed">{homeContent.welcomePara}</p>
            <p className="text-slate-700 mt-3 leading-relaxed">{homeContent.callToPara}</p>
            <div className="mt-6 flex gap-3">
              <a href="#contact" className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800">Get in touch</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
